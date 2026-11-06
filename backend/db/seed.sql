-- Datos iniciales tomados del catálogo INIFAP Durango (Campo Experimental Valle del Guadiana)

-- ===== CATEGORIAS: PRODUCTOS =====
INSERT INTO categorias (nombre, tipo, descripcion) VALUES
    ('Frijol', 'producto', 'Semillas mejoradas de frijol'),
    ('Carbón vegetal', 'producto', 'Carbón vegetal de producción local');

-- ===== CATEGORIAS: SERVICIOS =====
INSERT INTO categorias (nombre, tipo, descripcion) VALUES
    ('Evaluación de variedades vegetales', 'servicio', NULL),
    ('Asesoría o acompañamiento técnico', 'servicio', NULL),
    ('Cursos agrícolas', 'servicio', NULL),
    ('Cursos forestales', 'servicio', NULL);

-- ===== PRODUCTOS: FRIJOL NEGRO =====
-- imagen va solo en el primer registro de cada subgrupo: el frontend la usa
-- como miniatura representativa del grupo completo en el acordeon del catalogo.
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, modalidad, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'NOD 1', 'Variedad de frijol negro', 'Negro', 'img/productos/frijol-negro.jpg', TRUE);

-- ===== PRODUCTOS: FRIJOL PINTO =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, modalidad, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Centauro', 'Variedad de frijol pinto', 'Pinto', 'img/productos/frijol-pinto.jpg', TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Centenario', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Coloso', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Tepehuan-RS', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Libertad', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'PID 1', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Frijol'), 'Saltillo', 'Variedad de frijol pinto', 'Pinto', NULL, TRUE);

-- ===== PRODUCTOS: CARBON VEGETAL =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, modalidad, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Carbón vegetal'), 'Bolsa de 3 kg', 'Solo distribución local', NULL, 'img/productos/carbon-vegetal.jpg', TRUE);

-- ===== SERVICIOS: EVALUACION DE VARIEDADES VEGETALES =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Evaluación de variedades vegetales'), 'Alfalfa', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Evaluación de variedades vegetales'), 'Maíz', NULL, 'img/servicios/evaluacion-maiz.jpg', TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Evaluación de variedades vegetales'), 'Sorgo', NULL, NULL, TRUE);

-- ===== SERVICIOS: ASESORIA O ACOMPANAMIENTO TECNICO =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Asesoría o acompañamiento técnico'), 'Engorda de ganado bovino de productores cooperantes en praderas irrigadas del CEVAG', NULL, 'img/servicios/ganado-bovino.jpg', TRUE);

-- ===== SERVICIOS: CURSOS AGRICOLAS =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Cursos agrícolas'), 'Tecnología para producir maíz bajo riego y temporal en Durango', NULL, 'img/servicios/maiz-riego-temporal.jpg', TRUE);

-- ===== SERVICIOS: CURSOS FORESTALES =====
INSERT INTO productos_servicios (categoria_id, nombre, descripcion, imagen, activo) VALUES
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Elaboración de pellets y manejo de biomasa con fines dendroenergéticos', NULL, 'img/servicios/cursos-forestales.jpg', TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Establecimiento y manejo de plantaciones forestales de especies nativas con alto valor ecológico en áreas prioritarias de conservación', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Establecimiento y manejo de unidades productoras de germoplasma forestal', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Establecimiento y manejo de viveros forestales para la producción de especies nativas', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Fertilización en viveros forestales', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Generación y aplicación de modelos de volumen para programas de manejo forestal sustentables', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Manejo de la nutrición de especies forestales en etapa de vivero', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Modelos de índice de sitio para estimar potencial productivo en bosques', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Producción de planta de agave en sistema combinado de invernadero-acolchado en campo', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Producción de planta de especies forestales en vivero', NULL, NULL, TRUE),
    ((SELECT id FROM categorias WHERE nombre = 'Cursos forestales'), 'Perspectiva integral de volumen, biomasa y carbono para generar escenarios de referencia para créditos de carbono', NULL, NULL, TRUE);
