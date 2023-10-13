function createPage(title, content) {
  let html = "";

  html += `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
        <title>${title}</title> 
        <style>
        /* Agrega estilos personalizados aquí */
        body {
          background-color: #f8f9fa;
        }
    
        .navbar {
          background-color: #343a40;
          font-family: 'Montserrat', sans-serif;
          /* Aplica la fuente Montserrat */
        }
    
        .navbar-brand {
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
        }
    
        .nav-link {
          color: #ffffff;
          font-size: 18px;
          margin-right: 20px;
        }
    
        .nav-link:hover {
          color: #17a2b8;
        }
    
        .navbar-nav .active>.nav-link {
          background-color: #17a2b8;
        }
    
        .support {
          padding: 50px 0;
        }
    
        .support h2 {
          padding: 20px;
          color: red;
          border-bottom: 2px solid #000000;
        }
    
        .img-soporte {
          margin-top: -4%;
          padding: 20px;
        }
      </style>
    </head> 
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">LibroNet</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Inicio</a>
          </li>
          <li class="nav-item">
            <a class= "nav-link" href="/productos">Tienda</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sobreNosotros.html">Nosotros</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="soporte.html">Soporte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/usuarios">Usuarios</a>
          </li>
        </ul>
      </div>
      <form class="d-flex ml-auto" role="search">
      <a class="btn btn-outline-success me-2" href='/productos/nuevo'><i class="fa-solid fa-folder-plus"></i></a>
      <a class="btn btn-outline-success me-2" href="/registro"><i class="fa-solid fa-user"></i></i></a>
      <a class="btn btn-outline-success me-2"  href="/login"><i class="fa-solid fa-arrow-right-to-bracket"></i></a>
        
      </form>   
    </div>
  </nav>
        ${content}

        <footer class="bg-dark text-light">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-4">
          <h5>Enlaces rápidos</h5>
          <ul class="list-unstyled">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contacto</h5>
          <address>
            <p>Dirección: 123 Calle Libros, Ciudad</p>
            <p>Email: info@libronet.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </address>
        </div>
        <div class="col-md-4">
          <h5>Síguenos</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#"><i class="fab fa-facebook"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center py-3">
      <p>&copy; 2023 LibroNet. Todos los derechos reservados.</p>
    </div>
  </footer>
    </body>
    </html>`;

  return html;
}

function createProductList(productos) {
  let html = "";

  html += "<ul>";
  for (let i = 0; i < productos.length; i++) {
    html += "<li>" + productos[i].name + "</li>";
  }
  html += "</ul>";

  return html;
}

export default {
  createPage,
  createProductList,
}

export {
  createPage,
  createProductList,
}
