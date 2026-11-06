const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || 'inifap',
    password: process.env.PGPASSWORD || 'inifap',
    database: process.env.PGDATABASE || 'inifap_soluciones',
});

module.exports = pool;
