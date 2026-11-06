-- Script de correccion (una sola vez) para arreglar acentos en datos ya
-- cargados en la base de datos en vivo, cuando se sembro con una version
-- anterior de seed.sql sin acentos. No modifica estructura ni relaciones.

UPDATE categorias SET nombre = 'Carbón vegetal', descripcion = 'Carbón vegetal de producción local'
    WHERE nombre = 'Carbon vegetal';
UPDATE categorias SET nombre = 'Evaluación de variedades vegetales'
    WHERE nombre = 'Evaluacion de variedades vegetales';
UPDATE categorias SET nombre = 'Asesoría o acompañamiento técnico'
    WHERE nombre = 'Asesoria o acompanamiento tecnico';
UPDATE categorias SET nombre = 'Cursos agrícolas'
    WHERE nombre = 'Cursos agricolas';

UPDATE productos_servicios SET descripcion = 'Solo distribución local'
    WHERE descripcion = 'Solo distribucion local';
UPDATE productos_servicios SET nombre = 'Maíz'
    WHERE nombre = 'Maiz';
UPDATE productos_servicios SET nombre = 'Tecnología para producir maíz bajo riego y temporal en Durango'
    WHERE nombre = 'Tecnologia para producir maiz bajo riego y temporal en Durango';
UPDATE productos_servicios SET nombre = 'Elaboración de pellets y manejo de biomasa con fines dendroenergéticos'
    WHERE nombre = 'Elaboracion de pellets y manejo de biomasa con fines endoenergeticos';
UPDATE productos_servicios SET nombre = 'Establecimiento y manejo de plantaciones forestales de especies nativas con alto valor ecológico en áreas prioritarias de conservación'
    WHERE nombre = 'Establecimiento y manejo de plantaciones forestales de especies nativas con alto valor ecologico en areas prioritarias de conservacion';
UPDATE productos_servicios SET nombre = 'Establecimiento y manejo de viveros forestales para la producción de especies nativas'
    WHERE nombre = 'Establecimiento y manejo de viveros forestales para la produccion de especies nativas';
UPDATE productos_servicios SET nombre = 'Fertilización en viveros forestales'
    WHERE nombre = 'Fertilizacion en vivero forestales';
UPDATE productos_servicios SET nombre = 'Generación y aplicación de modelos de volumen para programas de manejo forestal sustentables'
    WHERE nombre = 'Generacion y aplicacion de modelos de volumen para programas de manejo forestal sustentables';
UPDATE productos_servicios SET nombre = 'Manejo de la nutrición de especies forestales en etapa de vivero'
    WHERE nombre = 'Manejo de la nutricion de especies forestales en etapa de vivero';
UPDATE productos_servicios SET nombre = 'Modelos de índice de sitio para estimar potencial productivo en bosques'
    WHERE nombre = 'Modelos de indice de sitio para estimar potencial productivo en bosques';
UPDATE productos_servicios SET nombre = 'Producción de planta de agave en sistema combinado de invernadero-acolchado en campo'
    WHERE nombre = 'Produccion de planta de agave en sistema combinado de invernadero-acolchado en campo';
UPDATE productos_servicios SET nombre = 'Producción de planta de especies forestales en vivero'
    WHERE nombre = 'Produccion de planta de especies forestales en vivero';
UPDATE productos_servicios SET nombre = 'Perspectiva integral de volumen, biomasa y carbono para generar escenarios de referencia para créditos de carbono'
    WHERE nombre = 'Perspectiva integral de volumen, biomasa y carbono para generar escenarios de referencia para creditos de carbono';
