import express from "express";
import ProductoRoute from '../routes/productos.routes.js';
import ApiProductoRoute from '../api/routes/route.api.productos.js';
import * as productosController from '../controllers/productos.controllers.js';

const app = express(); 

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.use(express.json()); 
app.use(ProductoRoute);
app.use('/api', ApiProductoRoute);

app.get("/productos", (req, res) => {
  const productos = obtenerProductos(); 
  res.render("productos", { productos: productos });
});
app.get("/login", (req, res) => {
  const login = obtenerLogin();

  res.render("login", { login: login });
});
app.get("/usuarios", (req, res) => {
  const usuarios = getAllUsers(); 
  res.render("usuarios", { usuarios: usuarios });
});


app.listen(3333);
