require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
const supermercadoRoutes = require('./routes/supermercado.routes');
const precioRoutes = require('./routes/precio.routes');
const productoRoutes = require('./routes/producto.routes');
const listaRoutes = require('./routes/lista.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/supermercados', supermercadoRoutes);
app.use('/api/precios', precioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/lista', listaRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});