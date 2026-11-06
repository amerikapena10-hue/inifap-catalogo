require('dotenv').config();
const path = require('path');
const express = require('express');

const categoriasRouter = require('./routes/categorias');
const productosRouter = require('./routes/productos');
const mensajesRouter = require('./routes/mensajes');
const opinionesRouter = require('./routes/opiniones');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/mensajes', mensajesRouter);
app.use('/api/opiniones', opinionesRouter);

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
