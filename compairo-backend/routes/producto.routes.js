const express = require('express');
const router = express.Router();
const db = require('../db');

// obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT p.id_producto, p.nombre, c.nombre AS categoria
      FROM producto p
      JOIN categoria c ON p.id_categoria = c.id_categoria
    `;

    const [rows] = await db.query(query);

    res.json(rows);

  } catch (error) {
    console.error('ERROR PRODUCTOS:', error);
    res.status(500).json({ mensaje: 'Error obteniendo productos' });
  }
});

// crear producto
router.post('/', async (req, res) => {

  try {

    const { nombre, id_categoria } = req.body;

    await db.query(
      `
      INSERT INTO Producto (nombre, id_categoria)
      VALUES (?, ?)
      `,
      [nombre, id_categoria]
    );

    res.json({
      mensaje: 'Producto creado correctamente'
    });

  } catch (error) {

    console.error('ERROR CREAR PRODUCTO:', error);

    res.status(500).json({
      mensaje: 'Error creando producto'
    });
  }
});
module.exports = router;