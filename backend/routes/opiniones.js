const express = require('express');
const pool = require('../db/pool');
const { texto, esCorreoValido } = require('../utils/validate');

const router = express.Router();

// GET /api/opiniones?producto_id=5 - opiniones aprobadas de un producto/servicio
router.get('/', async (req, res, next) => {
    try {
        const { producto_id } = req.query;
        if (!producto_id) {
            return res.status(400).json({ error: 'producto_id es obligatorio' });
        }
        const { rows } = await pool.query(
            `SELECT id, nombre, calificacion, mensaje, fecha
             FROM mensajes
             WHERE producto_id = $1 AND tipo = 'opinion' AND estado = 'aprobado'
             ORDER BY fecha DESC`,
            [producto_id]
        );
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// POST /api/opiniones - nueva opinion, siempre queda pendiente de aprobacion
router.post('/', async (req, res, next) => {
    try {
        const { producto_id, calificacion } = req.body;
        const nombre = texto(req.body.nombre);
        const correo = texto(req.body.correo);
        const mensaje = texto(req.body.mensaje);

        if (!producto_id || !nombre || !correo || !calificacion || !mensaje) {
            return res.status(400).json({ error: 'Producto, nombre, correo, calificación y mensaje son obligatorios.' });
        }
        if (!esCorreoValido(correo)) {
            return res.status(400).json({ error: 'El correo no tiene un formato válido.' });
        }
        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5.' });
        }

        const { rows } = await pool.query(
            `INSERT INTO mensajes (producto_id, tipo, nombre, correo, calificacion, mensaje, estado)
             VALUES ($1, 'opinion', $2, $3, $4, $5, 'pendiente')
             RETURNING id, fecha, estado`,
            [producto_id, nombre, correo, calificacion, mensaje]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
