const express = require('express');
const router = express.Router();
const db = require('../db');

// CREAR PRECIO
router.post('/', async (req, res) => {
  const { id_producto, id_supermercado, precio } = req.body;

  try {
    await db.query(
      'INSERT INTO precio (id_producto, id_supermercado, precio, fecha_actualizacion) VALUES (?, ?, ?, CURDATE())',
      [id_producto, id_supermercado, precio]
    );

    res.json({ mensaje: 'Precio guardado' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
});

module.exports = router;