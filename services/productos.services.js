import { readFile, writeFile } from "node:fs/promises";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://pepe:pepe@cluster0.f6pnvz5.mongodb.net/"); // mongodb://localhost:27017 -> 127.0.0.1 ipv6 ipv4

const db = client.db("AH20232CP1");

async function getProductos(filter = {}) {

  const filterMongo = { eliminado: { $ne: true } }


  if( filter.min && filter.max ){
    filterMongo.price = {$gte: parseInt(filter.min), $lte: parseInt(filter.max)}
  }else{
    if (filter.min) {
      filterMongo.price = { $gte: parseInt(filter.min) };
    }
  
    if (filter.max) {
      filterMongo.price = { $lte: parseInt(filter.max) };
    }
  }

  if( filter.description ){
    filterMongo.$text = { $search: filter.description }
  }


  return db
    .collection("libros")
    .find(filterMongo)
    .toArray();
}

const getCliente = async () => {
  try {
    const clientes = await db
      .collection("clientes") 
      .find({ eliminado: true }) 
      .toArray();

    return clientes;
  } catch (error) {
    console.error("Error al obtener datos de cliente:", error);
    throw error; 
  }
};


async function getProductosPorGenero(genero) {
  const filterMongo = { eliminado: { $ne: true } };

  if (genero !== 'todos') {
    filterMongo.genre = genero;
  }

  return db
    .collection("libros")
    .find(filterMongo)
    .toArray();
}

async function getProductobyId(id) {
  return db.collection("libros").findOne({ _id: new ObjectId(id) });
}

const createProducto = async (producto) => {
  const libro = await db.collection("libros").insertOne(producto);
  producto._id = libro.insertedId;

  return producto;
};

const remplazarProducto = async (id, producto) => {
  const productoEditado = await db.collection("libros").replaceOne({ _id: new ObjectId(id) }, producto);
  return productoEditado;
};
const editProducto = async (id, producto) => {
  try {
    const productoEditado = await db.collection("libros").updateOne({ _id: new ObjectId(id) }, { $set: producto });

    if (productoEditado.modifiedCount > 0) {

      return producto;
    } else {

      return null;
    }
  } catch (error) {
    console.error("Error al editar producto:", error);
    throw error; 
  }
};
const eliminarProducto = async (id) => {
  const productoEliminado = await db.collection("libros").deleteOne({ _id: new ObjectId(id) }); 
  return productoEliminado;
};

const getAllUsers = async () => {
  try {
    const usuarios = await db.collection("cliente").find().toArray();
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};


export {
  getProductos,
  getProductobyId,
  createProducto,
  remplazarProducto,
  eliminarProducto,
  editProducto,
  getProductosPorGenero,
  getCliente,
  getAllUsers
};
