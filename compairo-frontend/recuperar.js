function recuperar() {
  const correo = document.getElementById('correoRecuperar').value;

  if (!correo) {
    document.getElementById('mensaje').innerText = "Ingresa un correo";
    return;
  }

  fetch('http://localhost:3000/api/auth/recuperar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('mensaje').innerText = data.mensaje;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('mensaje').innerText = "Error en el servidor";
    });
}

function irLogin() {
  window.location.href = "login.html";
}