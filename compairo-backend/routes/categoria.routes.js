const express = require('express');
const router = express.Router();
const db = require('../db');

// obtener categorías
router.get('/', async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT * FROM Categoria
    `);

    res.json(rows);

  } catch (error) {

    console.error('ERROR CATEGORIAS:', error);

    res.status(500).json({
      mensaje: 'Error obteniendo categorías'
    });
  }
});

module.exports = router;