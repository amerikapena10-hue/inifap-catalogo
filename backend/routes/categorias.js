const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

// GET /api/categorias?tipo=producto|servicio
router.get('/', async (req, res, next) => {
    try {
        const { tipo } = req.query;
        const params = [];
        let query = 'SELECT id, nombre, tipo, descripcion FROM categorias';
        if (tipo) {
            params.push(tipo);
            query += ' WHERE tipo = $1';
        }
        query += ' ORDER BY nombre';
        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
