-- Esquema de base de datos: INIFAP Soluciones Agropecuarias
-- Coincide con el diagrama entidad-relacion proporcionado.

CREATE TABLE IF NOT EXISTS categorias (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(120) NOT NULL,
    tipo        VARCHAR(20)  NOT NULL CHECK (tipo IN ('producto', 'servicio')),
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS productos_servicios (
    id           SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
    nombre       VARCHAR(150) NOT NULL,
    descripcion  TEXT,
    precio       VARCHAR(50),
    modalidad    VARCHAR(100),
    duracion     VARCHAR(100),
    imagen       VARCHAR(255),
    activo       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS mensajes (
    id           SERIAL PRIMARY KEY,
    producto_id  INTEGER REFERENCES productos_servicios(id) ON DELETE SET NULL,
    tipo         VARCHAR(50),
    nombre       VARCHAR(150) NOT NULL,
    correo       VARCHAR(150) NOT NULL,
    telefono     VARCHAR(30),
    mensaje      TEXT NOT NULL,
    calificacion INTEGER CHECK (calificacion BETWEEN 1 AND 5),
    fecha        TIMESTAMP NOT NULL DEFAULT NOW(),
    estado       VARCHAR(30) NOT NULL DEFAULT 'pendiente'
);

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos_servicios(categoria_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_producto ON mensajes(producto_id);
