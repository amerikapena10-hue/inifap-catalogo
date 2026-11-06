const express = require('express');
const pool = require('../db/pool');
const { texto, esCorreoValido } = require('../utils/validate');

const router = express.Router();

// POST /api/mensajes - formulario de contacto / cotizacion
router.post('/', async (req, res, next) => {
    try {
        const nombre = texto(req.body.nombre);
        const correo = texto(req.body.correo);
        const mensaje = texto(req.body.mensaje);
        const telefono = texto(req.body.telefono);
        const { producto_id, tipo, calificacion } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({ error: 'Nombre, correo y mensaje son obligatorios.' });
        }
        if (!esCorreoValido(correo)) {
            return res.status(400).json({ error: 'El correo no tiene un formato válido.' });
        }

        const { rows } = await pool.query(
            `INSERT INTO mensajes (producto_id, tipo, nombre, correo, telefono, mensaje, calificacion)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, fecha, estado`,
            [producto_id || null, tipo || 'contacto', nombre, correo, telefono || null, mensaje, calificacion || null]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
