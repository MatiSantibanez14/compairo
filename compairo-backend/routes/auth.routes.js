const express = require('express');
const router = express.Router();
const db = require('../db'); // conexión

// LOGIN
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    if (rows.length > 0) {
      return res.json({
        mensaje: 'Login correcto',
        usuario: rows[0]
      });
    } else {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

  } catch (error) {
    console.error('ERROR LOGIN:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// REGISTRO
router.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    await db.query(
      'INSERT INTO usuario (nombre, correo, contrasena) VALUES (?, ?, ?)',
      [nombre, correo, contrasena]
    );

    res.json({
      mensaje: 'Usuario registrado correctamente'
    });

  } catch (err) {
    console.error(err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al registrar usuario'
    });
  }
});

router.post('/recuperar', async (req, res) => {
  const { correo } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) {
      return res.json({ mensaje: "Correo no registrado" });
    }

    // Simulación (no enviamos correo real)
    return res.json({
      mensaje: "Se ha enviado un enlace de recuperación a tu correo (simulado)"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;