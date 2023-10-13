function createProductListPage(productos) {
  let html = '<div class="row p-5">';
  for (let i = 0; i < productos.length; i++) {
    const moneda = productos[i].price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });

    html +=
      '<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">' +
      '<div class="card w-100">' +
      '<img src="' + productos[i].image_url + '" class="card-img-top" alt="' + productos[i].name + '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + productos[i].name + '</h5>' +
      '<p class="card-text">' + productos[i].description + '</p>' +
      '<p class="card-text"><strong>Precio: ' + moneda + '</strong></p>' +
      '<a href="/productos/' + productos[i]._id + '" class="btn btn-primary ">Ver Detalles</a>' +
      '<a href="/productos/editar/' + productos[i]._id + '" class="btn btn-secondary">Editar</a>' +
      '<a href="/productos/eliminar/' + productos[i]._id + '" class="btn btn-danger">Eliminar</a>' +
      '</div>' +
      '</div>' +
      '</div>';
  }
  html += '</div>';
  return createPage("productos", html);
}

import { createPage } from "../pages/utils.js";

function createPaginaDetalle(producto) {
  let html = "";
  if (producto) {
    html += `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Detalles del Producto</title>
      <style>
        img.product-image {
          max-width: 280px;
          max-height: 360px;
          margin-bottom: 20px; /* Agrega espacio en la parte inferior de la imagen */
        }
      </style>
    </head>
    <body>
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-6 d-flex align-items-center">
            <img src="${producto.image_url}" alt="${producto.name}" class="img-fluid product-image mx-auto">
          </div>
          <div class="col-lg-6">
            <h2>${producto.name}</h2>
            <p><strong>Precio:</strong> ${producto.price.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })}</p>
            <p><strong>Descripción:</strong> ${producto.description}</p>
            <div class="d-flex">
              <button class="btn btn-primary" id="downloadButton">Descargar</button>
            </div>
          </div>
        </div>
      </div>
      
      <div id="liveAlertPlaceholder"></div>
      
      <script>
        document.getElementById("downloadButton").addEventListener("click", function() {
          const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

          const alert = document.createElement("div");
          alert.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
          alert.innerHTML = "El producto ${producto.name} se ha descargado exitosamente.";
          alertPlaceholder.append(alert);

          setTimeout(function() {
            alert.classList.remove("show");
          }, 5000);
        });
      </script>
    </body>
    </html>
    `;
    html = createPage(producto.name, html);
  } else {
    html = createPage("Error", "<p>No se encontró el producto</p>");
  }
  return html;
}


function createForm() {
  let html = `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 mb-4"> <!-- Agregamos la clase "mb-4" para margen inferior -->
          <div class="card-body">
            <h5 class="card-title">Crear Producto</h5>
            <form action="/productos/nuevo" method="POST">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Nombre" required>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Precio</label>
                <input type="number" class="form-control" id="price" name="price" placeholder="Precio" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="description" name="description" placeholder="Descripción" required>
              </div>
              <div class="mb-3">
              <label for="author" class="form-label">Autor</label>
              <input type="text" class="form-control" id="author" name="author" placeholder="Autor" required>
            </div>
              <div class="mb-3">
                <label for="genre" class="form-label">Género</label>
                <input type="text" class="form-control" id="genre" name="genre" placeholder="Género">
              </div>
              <div class="mb-3">
                <label for="image_url" class="form-label">URL de la imagen</label>
                <input type="url" class="form-control" id="image_url" name="image_url" placeholder="URL de la imagen">
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;



  return createPage("Crear Producto", html);
}

function editForm(producto) {
  let html = `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 mb-4"> <!-- Agregamos la clase "mb-4" para margen inferior -->
          <div class="card-body">
            <h5 class="card-title">Editar Producto</h5>
            <form action="/productos/editar/${producto._id}" method="POST">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Nombre" value="${producto.name}" required>
              </div>
              <div class="mb-3">
              <label for="author" class="form-label">Autor</label>
              <input type="text" class="form-control" id="author" name="author" placeholder="Autor" value="${producto.author}" required>
            </div>
              <div class="mb-3">
                <label for="price" class="form-label">Precio</label>
                <input type="number" class="form-control" id="price" name="price" placeholder="Precio" value="${producto.price}" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="description" name="description" placeholder="Descripción" value="${producto.description}" required>
              </div>
              <div class="mb-3">
                <label for="genre" class="form-label">Género</label>
                <input type="text" class="form-control" id="genre" name="genre" placeholder="Género" value="${producto.genre}">
              </div>
              <div class="mb-3">
                <label for="image_url" class="form-label">URL de la imagen</label>
                <input type="url" class="form-control" id="image_url" name="image_url" placeholder="URL de la imagen" value="${producto.image_url}">
              </div>
              <button type="submit" class="btn btn-primary">Editar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;


  return createPage("Editar Producto", html);
}


function eliminarForm(producto) {
  let html = `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card p-4 mb-4"> <!-- Agregamos la clase "mb-4" para margen inferior -->
            <div class="card-body">
              <h5 class="card-title">Eliminar Producto</h5>
              <div class="container mt-5">
                <div class="row">
                  <div class="col-lg-6">
                    <img src="${producto.image_url}" alt="${producto.name}" class="img-fluid">
                  </div>
                  <div class="col-lg-6">
                    <h2>${producto.name}</h2>
                    <p><strong>Precio:</strong> ${producto.price.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })}</p>
                    <p><strong>Descripción:</strong> ${producto.description}</p>
                    <!-- Agregar el campo oculto para el nombre del producto -->
                    <input type="hidden" name="productName" value="${producto.name}">
                    <form action="/productos/eliminar/${producto._id}" method="POST">
                      <button type="submit" class="btn btn-danger">Eliminar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return createPage("Eliminar Producto", html);
}

export {
  createPaginaDetalle,
  createProductListPage,
  createForm,
  createPage,
  editForm,
  eliminarForm
};
