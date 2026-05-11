let listaActual = null;
let productosGlobal = [];
const regionesComunas = {
  RM: [
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
  ]
};

console.log("app.js cargado");

// 🔐 VALIDAR SESIÓN SOLO EN INDEX
document.addEventListener('DOMContentLoaded', function () {

  // SOLO para index
  if (window.location.href.includes('login.html')) {

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
      window.location.href = 'app.html';
      return;
    }

    // mostrar nombre
    document.getElementById('usuarioNombre').innerText =
      `Hola, ${usuario.nombre}`;

    const titulo = document.getElementById('bienvenida');
    if (titulo) {
      titulo.innerText = `Bienvenido/a ${usuario.nombre} 🛒`;
    }

    const ubicacion = JSON.parse(localStorage.getItem('ubicacion'));

    if (ubicacion) {
      document.getElementById('region').value = ubicacion.region;
      cargarComunas();
      document.getElementById('comuna').value = ubicacion.comuna;
    }

    cargarProductos();
    cargarListas();

    document.getElementById('buscadorProducto')
      ?.addEventListener('input', filtrarProductos);

    document.getElementById('region')
      ?.addEventListener('change', () => {
        cargarComunas();
        guardarUbicacion();
      });

    document.getElementById('comuna')
      ?.addEventListener('change', guardarUbicacion);
  }

  // 🔓 LOGIN (esto SIEMPRE se ejecuta)
  const btnLogin = document.getElementById('btnLogin');

  if (btnLogin) {
    btnLogin.addEventListener('click', login);
  }

});

// CARGAR PRODUCTOS EN SELECT
function cargarProductos() {
  fetch('http://localhost:3000/api/productos')
    .then(res => res.json())
    .then(data => {

      productosGlobal = data; // guardamos todos los productos

      renderProductos(data); // usamos nueva función

    })
    .catch(err => console.error('Error cargando productos:', err));
}

function renderProductos(lista) {
  const select = document.getElementById('productoId');
  select.innerHTML = '';

  lista.forEach(prod => {
    const option = document.createElement('option');
    option.value = prod.id_producto;
    option.text = prod.nombre;
    select.appendChild(option);
  });
}

function filtrarProductos() {
  const texto = document.getElementById('buscadorProducto').value.toLowerCase();

  const filtrados = productosGlobal.filter(prod =>
    prod.nombre.toLowerCase().includes(texto)
  );

  renderProductos(filtrados);
}

// CREAR LISTA
function crearLista() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const nombre = document.getElementById('nombreLista').value;

  if (!nombre) {
    alert('Ingresa un nombre para la lista');
    return;
  }

  fetch('http://localhost:3000/api/lista', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_usuario: usuario.id_usuario,
      nombre_lista: nombre
    })
  })
    .then(res => res.json())
    .then(data => {
      listaActual = data.id_lista;

      document.getElementById('listaId').innerText =
        'Lista ID: ' + listaActual;

      document.getElementById('nombreLista').value = '';

      // 👇 AQUÍ VA EL DELAY
      setTimeout(() => {
        cargarListas();
        verLista(listaActual);
      }, 300);

    })
    .catch(err => console.error('Error creando lista:', err));
}

// AGREGAR PRODUCTO
function agregarProducto() {
  if (!listaActual) {
    alert('Primero debes crear una lista');
    return;
  }

  const producto = document.getElementById('productoId').value;
  const cantidad = document.getElementById('cantidad').value;

  fetch('http://localhost:3000/api/lista/detalle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_lista: listaActual,
      id_producto: producto,
      cantidad: cantidad
    })
  })
    .then(res => res.json())
    .then(data => {

      // limpiar input
      document.getElementById('cantidad').value = '';

      // actualizar lista automáticamente
      cargarProductosLista(listaActual);

      // (opcional) pequeño mensaje visual
      const msg = document.getElementById('ahorro');
      msg.innerText = '✅ Producto agregado';

      setTimeout(() => {
        msg.innerText = '';
      }, 1500);

    })
    .catch(err => console.error('Error agregando producto:', err));
}

// COMPARAR PRECIOS + AHORRO
function comparar() {

  if (!listaActual) {
    alert('Primero debes crear una lista');
    return;
  }

  fetch(`http://localhost:3000/api/lista/comparar/${listaActual}`)

    .then(async res => {

      const data = await res.json();

      // validar errores
      if (!res.ok) {
        alert(data.mensaje);
        return;
      }

      const tabla = document.getElementById('resultado');
      tabla.innerHTML = '';

      const precios = data.map(item => Number(item.total));

      const minimo = Math.min(...precios);
      const maximo = Math.max(...precios);

      const formatoPeso = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      });

      data.forEach(item => {

        const fila = document.createElement('tr');

        const colSuper = document.createElement('td');
        colSuper.innerText = item.supermercado;

        const colTotal = document.createElement('td');
        colTotal.innerText =
          formatoPeso.format(item.total);

        const colExtra =
          document.createElement('td');

        if (Number(item.total) === minimo) {

          fila.style.backgroundColor = '#d4edda';

          colExtra.innerText = '🏆 Más barato';

        } else {

          colExtra.innerText = '-';
        }

        fila.appendChild(colSuper);
        fila.appendChild(colTotal);
        fila.appendChild(colExtra);

        tabla.appendChild(fila);
      });

      // mostrar ahorro
      const ahorro = maximo - minimo;

      document.getElementById('ahorro').innerText =
        '💰 Puedes ahorrar: ' +
        formatoPeso.format(ahorro);

    })

    .catch(err => {
      console.error('Error comparando:', err);
    });
}

// LOGOUT
window.logout = function () {
  localStorage.removeItem('usuario');
  window.location.href = 'principal.html';
};

// LOGIN
window.login = function () {
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, contrasena })
  })
    .then(async res => {
      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("DATA:", data);

      const mensaje = document.getElementById('mensaje');

      if (res.ok && data.usuario) {
        mensaje.innerText = 'Login correcto';

        // guardar usuario
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        // 🔥 REDIRECCIÓN SEGÚN ROL
        setTimeout(() => {
          if (data.usuario.id_rol == 1) {
            window.location.href = 'admin.html'; // 👈 admin
          } else {
            window.location.href = ''; // 👈 usuario normal
          }
        }, 1000);

      } else {
        mensaje.innerText = data.mensaje || 'Error en login';
      }
    })
    .catch(err => {
      console.error('Error en login:', err);
    });
};

// REGISTRO
window.registro = function () {
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  fetch('http://localhost:3000/api/auth/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, correo, contrasena })
  })
    .then(res => res.json())
    .then(data => {
      const mensaje = document.getElementById('mensaje');
      mensaje.innerText = data.mensaje;

      // redirigir a login
      if (data.mensaje === 'Usuario registrado correctamente') {
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      }
    })
    .catch(err => console.error('Error en registro:', err));
};

function cargarListas() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  fetch(`http://localhost:3000/api/lista/usuario/${usuario.id_usuario}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('misListas');
      contenedor.innerHTML = '';

      data.forEach(lista => {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';

        div.innerHTML = `
          <strong>${lista.nombre_lista}</strong>
          <button onclick="verLista(${lista.id_lista})">Ver</button>
        `;

        contenedor.appendChild(div);
      });
    })
    .catch(err => console.error('Error cargando listas:', err));
}


function verLista(id) {
  listaActual = id;

  document.getElementById('listaId').innerText = 'Lista ID: ' + id;

  // cargar productos
  cargarProductosLista(id);
}


function nuevaLista() {
  const nombre = prompt('Nombre de la nueva lista:');

  if (!nombre) return;

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  fetch('http://localhost:3000/api/lista', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_usuario: usuario.id_usuario,
      nombre_lista: nombre
    })
  })
    .then(res => res.json())
    .then(() => {
      cargarListas(); // refresca la lista
    })
    .catch(err => console.error(err));
}

function cargarProductosLista(idLista) {
  fetch(`http://localhost:3000/api/lista/detalle/${idLista}`)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('productosLista');
      lista.innerHTML = '';

      data.forEach(item => {
        const li = document.createElement('li');

        li.innerHTML = `
          ${item.nombre} - Cantidad: ${item.cantidad}
          <button onclick="eliminarProducto('${item.nombre}')">
            Eliminar
          </button>
        `;

        lista.appendChild(li);
      });
    })
    .catch(err => console.error('Error cargando productos:', err));
}

function eliminarProducto(nombreProducto) {

  fetch(`http://localhost:3000/api/lista/detalle/${listaActual}/${nombreProducto}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {

      alert(data.mensaje);

      // recargar productos de la lista
      cargarProductosLista(listaActual);

    })
    .catch(err => {
      console.error('Error eliminando producto:', err);
    });
}

function cargarComunas() {
  const region = document.getElementById('region').value;
  const selectComuna = document.getElementById('comuna');

  selectComuna.innerHTML = '<option value="">Selecciona comuna</option>';

  if (!region) return;

  regionesComunas[region].forEach(comuna => {
    const option = document.createElement('option');
    option.value = comuna;
    option.text = comuna;
    selectComuna.appendChild(option);
  });
}

function guardarUbicacion() {
  const region = document.getElementById('region').value;
  const comuna = document.getElementById('comuna').value;

  if (region && comuna) {
    localStorage.setItem('ubicacion', JSON.stringify({ region, comuna }));
  }
}
