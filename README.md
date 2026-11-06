# INIFAP Soluciones Agropecuarias

Copia con backend propio (Node.js + Express + PostgreSQL) de la pagina de catalogo de
productos y servicios del Campo Experimental Valle del Guadiana (INIFAP Durango).

## Estructura

```
proyecto_estadias/
  docker-compose.yml      -> levanta PostgreSQL y carga el esquema + datos de ejemplo
  backend/
    server.js             -> servidor Express (API, sirve el frontend)
    db/
      schema.sql           -> tablas: categorias, productos_servicios, mensajes
      seed.sql              -> datos de ejemplo (productos y servicios del catalogo)
      pool.js               -> conexion a PostgreSQL (pg.Pool)
    routes/
      categorias.js
      productos.js          -> incluye promedio de calificacion y total de opiniones
      mensajes.js            -> contacto y cotizaciones (tipo: 'contacto' | 'cotizacion')
      opiniones.js            -> opiniones publicas con calificacion (quedan pendientes de aprobar)
  frontend/
    index.html             -> pagina principal (resumen + enlaces a Productos/Servicios)
    equipo.html              -> equipo de investigacion
    productos.html            -> catalogo completo de productos
    servicios.html             -> catalogo completo de servicios
    css/style.css
    js/main.js              -> formulario de contacto general
    js/catalogo.js            -> listado, seleccion de productos y modal de cotizacion/opinion
    js/equipo.js               -> datos y render del equipo
    img/                     -> fotos reales, logo oficial del INIFAP
```

## Como correrlo

1. Levanta la base de datos con Docker (crea el usuario, la BD y carga `schema.sql` + `seed.sql`
   automaticamente la primera vez):

   ```
   docker compose up -d
   ```

2. Instala dependencias del backend:

   ```
   cd backend
   npm install
   ```

3. Copia `.env.example` a `.env` (los valores por defecto ya coinciden con `docker-compose.yml`,
   normalmente no hay que cambiar nada):

   ```
   copy .env.example .env
   ```

4. Arranca el servidor:

   ```
   npm start
   ```

5. Abre http://localhost:3000 — el backend sirve el frontend y expone la API en `/api/*`.

## Ver y administrar los datos (DBeaver)

Ya no hay un panel de administracion web — en su lugar, los mensajes de contacto, las
solicitudes de cotizacion y las opiniones se revisan directamente en la base de datos con
**DBeaver** (o cualquier cliente de PostgreSQL). Datos de conexion (con Docker corriendo):

- Host: `localhost`
- Puerto: `5433`
- Base de datos: `inifap_soluciones`
- Usuario: `inifap`
- Contrase&ntilde;a: `inifap`

Tabla `mensajes`: ahi caen los mensajes de contacto, cotizaciones y opiniones (columna `tipo`).
Las opiniones nuevas llegan con `estado = 'pendiente'` y solo se muestran en el sitio publico
cuando se cambia esa columna a `'aprobado'` (editable directamente desde la pestaña "Datos" de
DBeaver). La tabla `productos_servicios` tambien se puede editar ahi mismo (agregar, modificar
precios/descripciones, o poner `activo = false` para ocultar un producto del catalogo).

**Importante:** Docker sigue siendo necesario para que el sitio funcione — es el servidor de
base de datos del que depende el backend Express para responder la API (cargar el catalogo,
guardar mensajes, etc.). DBeaver solo es una ventana para ver/editar esos mismos datos; no
reemplaza al contenedor, debe seguir corriendo mientras uses el sitio.

## Funcionalidad del catalogo publico

En las paginas de **Productos** y **Servicios**, cada producto/servicio tiene una casilla de
seleccion y un enlace peque&ntilde;o **"★ Opinar"**. Al marcar uno o varios productos aparece una
barra flotante con un solo boton **"Solicitar cotizacion"**, que abre un formulario para
solicitar cotizacion de todos los productos marcados a la vez (en lugar de un boton por cada
producto). El enlace "★ Opinar" abre el mismo formulario pero para dejar una calificacion de
1 a 5 estrellas de ese producto en particular (queda `pendiente` hasta que se apruebe en DBeaver).

Cuando un producto tiene opiniones aprobadas, el catalogo muestra su promedio y el numero de
opiniones junto al nombre.
