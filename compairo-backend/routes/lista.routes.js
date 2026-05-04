const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/comparar/:id_lista', async (req, res) => {
  try {
    const { id_lista } = req.params;

    const query = `
      SELECT 
        s.nombre AS supermercado,
        SUM(p.precio * dl.cantidad) AS total
      FROM ListaCompra lc
      JOIN DetalleLista dl ON lc.id_lista = dl.id_lista
      JOIN Precio p ON dl.id_producto = p.id_producto
      JOIN Supermercado s ON p.id_supermercado = s.id_supermercado
      WHERE lc.id_lista = ?
      GROUP BY s.nombre
    `;

    const [rows] = await db.query(query, [id_lista]);

    res.json(rows);

  } catch (error) {
    console.error('ERROR COMPARAR:', error);
    res.status(500).json({ mensaje: 'Error al comparar precios' });
  }
});

// crear nueva lista de compra
router.post('/', (req, res) => {
  const { id_usuario, nombre_lista } = req.body;

  const query = `
    INSERT INTO ListaCompra (id_usuario, nombre_lista, fecha_creacion)
    VALUES (?, ?, NOW())
  `;

  db.query(query, [id_usuario, nombre_lista], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear lista' });
    }

    res.json({
      message: 'Lista creada correctamente',
      id_lista: result.insertId
    });
  });
});

// agregar producto a lista
router.post('/detalle', async (req, res) => {
  try {
    const { id_lista, id_producto, cantidad } = req.body;

    const query = `
      INSERT INTO DetalleLista (id_lista, id_producto, cantidad)
      VALUES (?, ?, ?)
    `;

    await db.query(query, [id_lista, id_producto, cantidad]);

    res.json({ message: 'Producto agregado a la lista' });

  } catch (error) {
    console.error('ERROR AGREGAR PRODUCTO:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

router.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT id_lista, nombre_lista
      FROM ListaCompra
      WHERE id_usuario = ?
    `;

    const [rows] = await db.query(sql, [id]);

    res.json(rows);

  } catch (error) {
    console.error('ERROR LISTAS:', error);
    res.status(500).json({ mensaje: 'Error obteniendo listas' });
  }
});

router.get('/detalle/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT p.nombre, dl.cantidad
      FROM DetalleLista dl
      JOIN Producto p ON dl.id_producto = p.id_producto
      WHERE dl.id_lista = ?
    `;

    const [rows] = await db.query(sql, [id]);

    res.json(rows);

  } catch (error) {
    console.error('ERROR DETALLE:', error);
    res.status(500).json({ mensaje: 'Error obteniendo detalle' });
  }
});

module.exports = router;