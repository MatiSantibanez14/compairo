const express = require('express');
const router = express.Router();
const db = require('../db');

// CREAR SUPERMERCADO
router.post('/', async (req, res) => {

  const { nombre, region, comuna } = req.body;

  try {

    // verificar duplicado
    const [existe] = await db.query(
      `
      SELECT *
      FROM supermercado
      WHERE nombre = ?
      AND comuna = ?
      `,
      [nombre, comuna]
    );

    if (existe.length > 0) {

      return res.status(400).json({
        mensaje: 'Ese supermercado ya existe en esa comuna'
      });
    }

    // insertar
    await db.query(
      `
      INSERT INTO supermercado (nombre, region, comuna)
      VALUES (?, ?, ?)
      `,
      [nombre, region, comuna]
    );

    res.json({
      mensaje: 'Supermercado creado'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error'
    });
  }
});

// GET supermercados
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM supermercado');
    res.json(rows);
  } catch (error) {
    console.error('ERROR REAL:', error); // 👈 IMPORTANTE
    res.status(500).json({ mensaje: 'Error' });
  }
});

module.exports = router;
