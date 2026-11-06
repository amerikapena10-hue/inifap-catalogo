const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

// GET /api/productos?tipo=producto|servicio
// Devuelve productos/servicios activos junto con su categoria, agrupables en el frontend.
router.get('/', async (req, res, next) => {
    try {
        const { tipo } = req.query;
        const params = [];
        let query = `
            SELECT ps.id, ps.nombre, ps.descripcion, ps.precio, ps.modalidad,
                   ps.duracion, ps.imagen, ps.activo,
                   c.id AS categoria_id, c.nombre AS categoria_nombre, c.tipo AS categoria_tipo,
                   op.promedio_calificacion, op.total_opiniones
            FROM productos_servicios ps
            JOIN categorias c ON c.id = ps.categoria_id
            LEFT JOIN LATERAL (
                SELECT ROUND(AVG(calificacion)::numeric, 1) AS promedio_calificacion,
                       COUNT(*) AS total_opiniones
                FROM mensajes
                WHERE producto_id = ps.id AND tipo = 'opinion' AND estado = 'aprobado'
            ) op ON TRUE
            WHERE ps.activo = TRUE
        `;
        if (tipo) {
            params.push(tipo);
            query += ` AND c.tipo = $${params.length}`;
        }
        query += ' ORDER BY c.nombre, ps.modalidad NULLS FIRST, ps.nombre';
        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// GET /api/productos/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT ps.*, c.nombre AS categoria_nombre, c.tipo AS categoria_tipo
             FROM productos_servicios ps
             JOIN categorias c ON c.id = ps.categoria_id
             WHERE ps.id = $1`,
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
