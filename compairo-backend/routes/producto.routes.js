const express = require('express');
const router = express.Router();
const db = require('../db');

// obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT p.id_producto, p.nombre, c.nombre AS categoria
      FROM Producto p
      JOIN Categoria c ON p.id_categoria = c.id_categoria
    `;

    const [rows] = await db.query(query);

    res.json(rows);

  } catch (error) {
    console.error('ERROR PRODUCTOS:', error);
    res.status(500).json({ mensaje: 'Error obteniendo productos' });
  }
});

module.exports = router;