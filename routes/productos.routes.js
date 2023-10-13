import express from "express";
import * as controllers from '../controllers/productos.controllers.js'
import { getProductosPorGenero } from '../services/productos.services.js';
import { db } from '../db.js';

const route = express.Router()

route.get("/productos", controllers.getProductos);

route.get("/usuarios",controllers.getAllUsers);

route.get("/login", controllers.getCliente)

route.get("/registro", controllers.getRegistroFormPage);

route.post("/registro", controllers.registerUser);


route.get("/productos/nuevo", controllers.createProductFormPage);
route.post("/productos/nuevo", controllers.createProduct);
route.get( "/productos/editar/:producto_id", controllers.editProductoFrom );
route.post( "/productos/editar/:producto_id", controllers.editProducto );

route.get("/productos/eliminar/:producto_id", controllers.eliminarProductoFrom);
route.post("/productos/eliminar/:producto_id", controllers.eliminarProducto);

route.get("/productos/:producto_id", controllers.getProductobyId);

route.post("/productos/filtrar", async (req, res) => {
    const { genero } = req.body;
    try {
      const productosFiltrados = await getProductosPorGenero(genero);

      console.log("Productos obtenidos:", productosFiltrados);
      
      res.render('productos', { productos: productosFiltrados });
    } catch (error) {
      console.error("Error al filtrar productos:", error);
      res.status(500).send("Error interno del servidor");
    }
});

route.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body; 

  try {
    console.log("Correo ingresado:", correo); 

    const user = await db.collection("cliente").findOne({ correo });

    console.log("Usuario encontrado en la base de datos:", user); 

    if (!user) {
      console.error("Usuario no encontrado en la base de datos");
      return res.status(401).send("Credenciales incorrectas");
    }

    if (contraseña !== user.contraseña) {

      console.error("Contraseña incorrecta");
      return res.status(401).send("Credenciales incorrectas");
    }

    res.redirect('/'); 

  } catch (error) {
 
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error interno del servidor");
  }
});



export default route
