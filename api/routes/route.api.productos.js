import { Router } from 'express'
import * as controllers from '../controllers/controller.api.productos.js'

const route = Router()

route.get('/productos', controllers.getProductos)

route.get('/productos/:id', controllers.getProductoById)

route.post('/productos', controllers.agregarProducto)

route.put('/productos/:id', controllers.remplazarProducto)

route.patch('/productos/:id', controllers.actualizarProducto)

route.delete("/productos/:id", controllers.eliminarProducto)

export default route
