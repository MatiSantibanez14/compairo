const comunasRM = [
  "San Bernardo",
  "Maipú",
  "Santiago",
  "Puente Alto",
  "La Florida",
  "Providencia",
  "Ñuñoa",
  "Las Condes",
  "San Miguel",
  "Estación Central"
];

// Validar que sea admin
document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || usuario.id_rol != 1) {
    alert('Acceso denegado');
    window.location.href = '';
    return;
  }

  cargarProductos();
  cargarSupermercados();
  cargarPrecios();
  cargarCategorias();
  cargarComunasAdmin();
});

// CREAR PRODUCTO
function crearProducto() {
  const nombre = document.getElementById('nombreProducto').value;

  const id_categoria =
  document.getElementById('categoriaProducto').value;

  fetch('http://https://compairo-backend.onrender.com/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      id_categoria
      })
  })
    .then(res => res.json())
    .then(() => {
      alert('Producto creado');
      cargarProductos();
    });
}

// CREAR SUPERMERCADO
function crearSupermercado() {

  const nombre =
    document.getElementById('nombreSuper').value;

  const region =
    document.getElementById('regionSuper').value;

  const comuna =
    document.getElementById('comunaSuper').value;

  fetch('http://https://compairo-backend.onrender.com/api/supermercados', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      nombre,
      region,
      comuna
    })

  })

  .then(async res => {

    const data = await res.json();

    if (!res.ok) {

      alert(data.mensaje);

      return;
    }

    alert(data.mensaje);

    cargarSupermercados();

  })

  .catch(err => {
    console.error(err);
  });
}

// CREAR PRECIO
function crearPrecio() {

  const id_producto = document.getElementById('productoPrecio').value;
  const id_supermercado = document.getElementById('superPrecio').value;
  const precio = document.getElementById('precio').value;

  fetch('http://https://compairo-backend.onrender.com/api/precios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_producto,
      id_supermercado,
      precio
    })
  })
    .then(res => res.json())
    .then(() => {

      alert('Precio guardado');

      cargarPrecios();

    });
}

// CARGAR PRECIOS
function cargarPrecios() {

  fetch('http://https://compairo-backend.onrender.com/api/precios')
    .then(res => res.json())
    .then(data => {

      const lista = document.getElementById('listaPreciosAdmin');

      lista.innerHTML = '';

      data.forEach(item => {

        const li = document.createElement('li');

        li.innerText = `${item.producto} - ${item.supermercado} - $${Number(item.precio).toLocaleString('es-CL')}`;

        lista.appendChild(li);

      });

    })
    .catch(err => {
      console.error('Error cargando precios:', err);
    });
}

// CARGAR PRODUCTOS
function cargarProductos() {
  fetch('http://https://compairo-backend.onrender.com/api/productos')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('productoPrecio');
      select.innerHTML = '';
      const lista = document.getElementById('listaProductosAdmin');
      lista.innerHTML = '';
      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id_producto;
        option.text = p.nombre;
        select.appendChild(option);
        const li = document.createElement('li');
        li.innerText = p.nombre;

        lista.appendChild(li);
      });
    });
}

// CARGAR SUPERMERCADOS
function cargarSupermercados() {

  fetch('http://https://compairo-backend.onrender.com/api/supermercados')

    .then(res => res.json())

    .then(data => {

      const select =
        document.getElementById('superPrecio');

      select.innerHTML = '';

      // evitar repetidos
      const nombresUnicos = [];

      data.forEach(s => {

        if (!nombresUnicos.includes(s.nombre)) {

          nombresUnicos.push(s.nombre);

          const option =
            document.createElement('option');

          option.value = s.id_supermercado;

          option.text = s.nombre;

          select.appendChild(option);
        }
      });
    });
}

// CARGAR CATEGORIAS
function cargarCategorias() {

  fetch('http://https://compairo-backend.onrender.com/api/categorias')
    .then(res => res.json())
    .then(data => {

      const select = document.getElementById('categoriaProducto');

      select.innerHTML = '';

      data.forEach(c => {

        const option = document.createElement('option');

        option.value = c.id_categoria;
        option.text = c.nombre;

        select.appendChild(option);

      });

    })
    .catch(err => {
      console.error('Error cargando categorías:', err);
    });
}

function cargarComunasAdmin() {

  const select =
    document.getElementById('comunaSuper');

  select.innerHTML = '';

  comunasRM.forEach(comuna => {

    const option = document.createElement('option');

    option.value = comuna;
    option.text = comuna;

    select.appendChild(option);

  });
}

function logout() {

  localStorage.removeItem('usuario');

  window.location.href = 'login.html';
}