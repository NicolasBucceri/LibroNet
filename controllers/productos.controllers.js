import { ObjectId } from "mongodb";
import * as service from "../services/productos.services.js";
import * as view from "../views/productos.views.js";
import { db } from '../db.js'; 

const getProductos = (req, res) => {
  service.getProductos({ eliminado: true })
    .then((productos) => {
    res.render('productos', { productos: productos });
  });
};

const getCliente = (req, res) => {
  service.getCliente()
    .then((cliente) => {
      res.render('login', { cliente: cliente });
    })
    .catch((error) => {
      console.error("Error al obtener datos de cliente:", error);
      res.status(500).send("Error interno del servidor");
    });
}

const getRegistroFormPage = (req, res) => {
  res.render('registro');
};

const registerUser = async (req, res) => {
  const { nombre, correo, image_url, contraseña, rol } = req.body; 

  try {
    const existingUser = await db.collection("cliente").findOne({ correo });

    if (existingUser) {
      res.status(400).send("El usuario ya existe. Por favor, inicia sesión.");
    } else {
      const newUser = {
        nombre,
        image_url,
        correo,
        contraseña,
        rol,
      };
      await db.collection("cliente").insertOne(newUser);
      res.redirect('/'); 
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const getProductobyId = (req, res) => {
  const idProducto = req.params.producto_id;
  service.getProductobyId(idProducto).then((producto) => {
    if (producto) {
      res.send(view.createPaginaDetalle(producto));
    } else {
      res.send(view.createPage("Error", "<p>No se encontro el producto</p>"));
    }
  });
};

const createProductFormPage = (req, res) => {
  res.send(view.createForm());
};

const createProduct = (req, res) => {
  const producto = {
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description,
    genre: req.body.genre,
    image_url: req.body.image_url, 
  };

  service
    .createProducto(producto)
    .then((productoNuevo) => {
      res.send(
        view.createPage(
          "Producto Creado",
          `<p>Producto ${productoNuevo.name} creado con el id ${productoNuevo._id}</p>`
        )
      );
    })
    .catch((error) => res.send(view.createPage("Error", `<p> ${error}</p>`)));
};

const editProductoFrom = (req, res) => {
  const id = req.params.producto_id;
  service.getProductobyId(id).then((producto) => {
    if (producto) {
      res.send(view.editForm(producto));
    } else {
      res.send(
        view.createPage(
          "No se encontro producto",
          "<h1>No se encontro el producto solicitado</h1>"
        )
      );
    }
  });
};

const editProducto = async (req, res) => {
  const id = req.params.producto_id;
  const producto = {
    name: req.body.name,
    author: req.body.author,
    price: parseFloat(req.body.price),
    description: req.body.description,
    genre: req.body.genre,
    image_url: req.body.image_url,
  };

  if (ObjectId.isValid(id)) {
    service.editProducto(id, producto)
      .then((productoEditado) => {
        if (productoEditado) {
          const successMessage = `<h2>Producto "${producto.name}" Editado con éxito</h2>`;
          const backButton = `<a href="/productos" class="btn btn-primary" style="margin-bottom: 20px;">Volver a la tienda</a>
          `;
          const html = successMessage + backButton;
          res.send(view.createPage("Producto Modificado", html));
        } else {
          res.send(view.createPage("No se pudo editar", "<h1>No se pudo editar</h1>"));
        }
      })
      .catch((error) => {
        console.error("Error al editar producto:", error);
        res.status(500).send("Error interno del servidor");
      });
  } else {
    res.status(400).send("ID de producto no válido");
  }
};

const eliminarProductoFrom = (req, res) => {
  const id = req.params.producto_id

  service.getProductobyId(id).then((producto) => {
    if (producto) {
      res.send(view.eliminarForm(producto));
    } else {
      res.send(
        view.createPage(
          "No se encontro producto",
          "<h1>No se encontro el producto solicitado</h1>"
        )
      );
    }
  });
}

const eliminarProducto = (req, res) => {
  const id = req.params.producto_id;
  const productName = req.body.productName; 

  service.eliminarProducto(id)
    .then((productoEliminado) => {
      if (productoEliminado) {
        res.send(view.createPage("Producto Eliminado", `<h2>Producto "${productName}" Eliminado con éxito</h2>`));
      } else {
        res.send(view.createPage("No se pudo eliminar", "<h1>No se pudo eliminar</h1>"));
      }
    })
    .catch((error) => {
      console.error("Error al eliminar producto:", error);
      res.status(500).send("Error interno del servidor");
    });
}

const getAllUsers = (req, res) => {
  service.getAllUsers()
    .then((usuarios) => {
      res.render('usuarios', { usuarios: usuarios });
    })
    .catch((error) => {
      console.error("Error al obtener usuarios:", error);
      res.status(500).send("Error interno del servidor");
    });
};

export { getProductos,
  getProductobyId,
  createProductFormPage,
  createProduct,
  editProductoFrom,
  editProducto,
  eliminarProductoFrom,
  eliminarProducto,
  getCliente,
  registerUser,
  getRegistroFormPage,
  getAllUsers
};
