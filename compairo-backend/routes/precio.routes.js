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

router.get('/', async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT 
        p.nombre AS producto,
        s.nombre AS supermercado,
        pr.precio
      FROM precio pr
      JOIN producto p ON pr.id_producto = p.id_producto
      JOIN supermercado s ON pr.id_supermercado = s.id_supermercado
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error obteniendo precios'
    });
  }
});

module.exports = router;