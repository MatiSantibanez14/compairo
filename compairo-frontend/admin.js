// Validar que sea admin
document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || usuario.id_rol != 1) {
    alert('Acceso denegado');
    window.location.href = 'index.html';
    return;
  }

  cargarProductos();
  cargarSupermercados();
});

// CREAR PRODUCTO
function crearProducto() {
  const nombre = document.getElementById('nombreProducto').value;

  fetch('http://localhost:3000/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre })
  })
    .then(res => res.json())
    .then(() => {
      alert('Producto creado');
      cargarProductos();
    });
}

// CREAR SUPERMERCADO
function crearSupermercado() {
  const nombre = document.getElementById('nombreSuper').value;
  const region = document.getElementById('regionSuper').value;
  const comuna = document.getElementById('comunaSuper').value;

  fetch('http://localhost:3000/api/supermercados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, region, comuna })
  })
    .then(res => res.json())
    .then(() => {
      alert('Supermercado creado');
      cargarSupermercados();
    });
}

// CREAR PRECIO
function crearPrecio() {
  const id_producto = document.getElementById('productoPrecio').value;
  const id_supermercado = document.getElementById('superPrecio').value;
  const precio = document.getElementById('precio').value;

  fetch('http://localhost:3000/api/precios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_producto, id_supermercado, precio })
  })
    .then(res => res.json())
    .then(() => {
      alert('Precio guardado');
    });
}

// CARGAR PRODUCTOS
function cargarProductos() {
  fetch('http://localhost:3000/api/productos')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('productoPrecio');
      select.innerHTML = '';

      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id_producto;
        option.text = p.nombre;
        select.appendChild(option);
      });
    });
}

// CARGAR SUPERMERCADOS
function cargarSupermercados() {
  fetch('http://localhost:3000/api/supermercados')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('superPrecio');
      select.innerHTML = '';

      data.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id_supermercado;
        option.text = s.nombre;
        select.appendChild(option);
      });
    });
}