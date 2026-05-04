const express = require('express');
const router = express.Router();
const db = require('../db');

// CREAR SUPERMERCADO
router.post('/', async (req, res) => {
  const { nombre, region, comuna } = req.body;

  try {
    await db.query(
      'INSERT INTO supermercado (nombre, region, comuna) VALUES (?, ?, ?)',
      [nombre, region, comuna]
    );

    res.json({ mensaje: 'Supermercado creado' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
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

module.exports = router;