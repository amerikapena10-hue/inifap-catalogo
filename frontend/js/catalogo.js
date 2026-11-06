// Logica compartida del catalogo (Productos y Servicios): listado agrupado,
// seleccion de productos para cotizar en conjunto y el modal de "Solicitar
// cotizacion" / "Dejar opinion".

const seleccionCotizacion = new Map(); // id -> nombre

// Agrupa filas de productos_servicios por categoria y, si existe, por modalidad.
function groupByCategoria(rows) {
    const grupos = new Map();
    for (const row of rows) {
        if (!grupos.has(row.categoria_nombre)) grupos.set(row.categoria_nombre, new Map());
        const subgrupos = grupos.get(row.categoria_nombre);
        const clave = row.modalidad || '__sin_modalidad__';
        if (!subgrupos.has(clave)) subgrupos.set(clave, []);
        subgrupos.get(clave).push(row);
    }
    return grupos;
}

function construirItem(item) {
    const li = document.createElement('li');
    li.className = 'catalog-item';

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'catalog-item__check';
    check.dataset.id = item.id;
    check.dataset.nombre = item.nombre;
    check.setAttribute('aria-label', `Agregar ${item.nombre} a la cotización`);
    li.appendChild(check);

    const texto = document.createElement('span');
    texto.className = 'catalog-item__text';
    texto.textContent = item.descripcion && item.descripcion !== item.nombre
        ? `${item.nombre} (${item.descripcion})`
        : item.nombre;
    li.appendChild(texto);

    if (item.total_opiniones > 0) {
        const rating = document.createElement('span');
        rating.className = 'catalog-item__rating';
        rating.textContent = `★ ${item.promedio_calificacion} (${item.total_opiniones})`;
        li.appendChild(rating);
    }

    const btnOpinar = document.createElement('button');
    btnOpinar.type = 'button';
    btnOpinar.className = 'catalog-item__opinar';
    btnOpinar.dataset.action = 'opinar';
    btnOpinar.dataset.id = item.id;
    btnOpinar.dataset.nombre = item.nombre;
    btnOpinar.textContent = '★ Opinar';
    li.appendChild(btnOpinar);

    return li;
}

function renderCatalogo(rows, contenedor) {
    contenedor.innerHTML = '';

    if (!rows.length) {
        contenedor.innerHTML = '<p>Pr&oacute;ximamente.</p>';
        return;
    }

    const grupos = groupByCategoria(rows);

    for (const [categoria, subgrupos] of grupos) {
        const grupoEl = document.createElement('div');
        grupoEl.className = 'catalog-group';

        const titulo = document.createElement('p');
        titulo.className = 'catalog-group__title';
        titulo.textContent = categoria;
        grupoEl.appendChild(titulo);

        for (const [modalidad, items] of subgrupos) {
            const subgrupoEl = document.createElement('div');
            subgrupoEl.className = 'catalog-subgroup';

            const imagenItem = items.find((item) => item.imagen);
            if (imagenItem) {
                const img = document.createElement('img');
                img.className = 'catalog-subgroup__media';
                img.src = imagenItem.imagen;
                img.alt = imagenItem.nombre;
                img.loading = 'lazy';
                subgrupoEl.appendChild(img);
            }

            const contenidoEl = document.createElement('div');
            contenidoEl.className = 'catalog-subgroup__content';

            if (modalidad !== '__sin_modalidad__') {
                const subtitulo = document.createElement('p');
                subtitulo.className = 'catalog-subgroup__title';
                subtitulo.textContent = modalidad;
                contenidoEl.appendChild(subtitulo);
            }

            const lista = document.createElement('ul');
            for (const item of items) {
                lista.appendChild(construirItem(item));
            }
            contenidoEl.appendChild(lista);

            subgrupoEl.appendChild(contenidoEl);
            grupoEl.appendChild(subgrupoEl);
        }

        contenedor.appendChild(grupoEl);
    }
}

async function cargarCatalogo(tipo, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    try {
        const resp = await fetch(`/api/productos?tipo=${encodeURIComponent(tipo)}`);
        if (!resp.ok) throw new Error('Error al consultar el catalogo');
        const rows = await resp.json();
        renderCatalogo(rows, contenedor);
    } catch (err) {
        contenedor.innerHTML = '<p>No se pudo cargar la informaci&oacute;n. Intenta de nuevo m&aacute;s tarde.</p>';
        console.error(err);
    }
}

// ---------- Barra flotante de seleccion ----------

function crearBarraFlotante() {
    let barra = document.getElementById('cotizacion-bar');
    if (barra) return barra;
    barra = document.createElement('div');
    barra.id = 'cotizacion-bar';
    barra.className = 'cotizacion-bar';
    barra.hidden = true;
    barra.innerHTML = `
        <span class="cotizacion-bar__count"></span>
        <button type="button" class="cotizacion-bar__btn">Solicitar cotización</button>
    `;
    document.body.appendChild(barra);
    return barra;
}

// ---------- Modal de cotizacion / opinion ----------

function initAccionModal() {
    const dialog = document.getElementById('accion-modal');
    const form = document.getElementById('accion-form');
    if (!dialog || !form) return;

    const titulo = document.getElementById('accion-modal-title');
    const productoLabel = document.getElementById('accion-modal-producto');
    const telefonoRow = document.getElementById('accion-telefono-row');
    const estrellasWrap = document.getElementById('accion-estrellas');
    const calificacionInput = document.getElementById('accion-calificacion');
    const mensajeInput = document.getElementById('accion-mensaje');
    const status = document.getElementById('accion-status');

    let accionActual = 'cotizar';
    let productosActuales = [];

    const barra = crearBarraFlotante();
    const barraCount = barra.querySelector('.cotizacion-bar__count');
    const barraBtn = barra.querySelector('.cotizacion-bar__btn');

    function actualizarBarra() {
        const n = seleccionCotizacion.size;
        barra.hidden = n === 0;
        barraCount.textContent = n === 1 ? '1 producto seleccionado' : `${n} productos seleccionados`;
    }

    function resetFormulario() {
        form.reset();
        status.textContent = '';
        status.className = 'contact-form__status';
        calificacionInput.value = '5';
        estrellasWrap.querySelectorAll('button').forEach((btn) => {
            btn.classList.toggle('is-active', Number(btn.dataset.value) <= 5);
        });
    }

    function abrirOpinar(id, nombre) {
        accionActual = 'opinar';
        productosActuales = [{ id, nombre }];
        resetFormulario();

        titulo.textContent = 'Dejar una opinión';
        productoLabel.textContent = nombre;
        mensajeInput.placeholder = 'Comparte tu experiencia con este producto o servicio';
        telefonoRow.hidden = true;
        estrellasWrap.hidden = false;

        dialog.showModal();
    }

    function abrirCotizarSeleccion() {
        if (seleccionCotizacion.size === 0) return;
        accionActual = 'cotizar';
        productosActuales = Array.from(seleccionCotizacion, ([id, nombre]) => ({ id, nombre }));
        resetFormulario();

        titulo.textContent = 'Solicitar cotización';
        productoLabel.textContent = productosActuales.map((p) => p.nombre).join(', ');
        mensajeInput.placeholder = 'Cuéntanos qué cantidad o información necesitas';
        telefonoRow.hidden = false;
        estrellasWrap.hidden = true;

        dialog.showModal();
    }

    document.addEventListener('change', (event) => {
        const check = event.target.closest('.catalog-item__check');
        if (!check) return;
        if (check.checked) seleccionCotizacion.set(check.dataset.id, check.dataset.nombre);
        else seleccionCotizacion.delete(check.dataset.id);
        actualizarBarra();
    });

    document.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-action="opinar"]');
        if (!btn) return;
        abrirOpinar(btn.dataset.id, btn.dataset.nombre);
    });

    barraBtn.addEventListener('click', abrirCotizarSeleccion);

    document.getElementById('accion-cancelar').addEventListener('click', () => dialog.close());

    estrellasWrap.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const valor = Number(btn.dataset.value);
            calificacionInput.value = valor;
            estrellasWrap.querySelectorAll('button').forEach((b) => {
                b.classList.toggle('is-active', Number(b.dataset.value) <= valor);
            });
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        status.textContent = '';
        status.className = 'contact-form__status';

        const formData = new FormData(form);
        const esCotizacion = accionActual === 'cotizar';

        try {
            if (esCotizacion) {
                const envios = productosActuales.map((p) => fetch('/api/mensajes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        producto_id: p.id,
                        tipo: 'cotizacion',
                        nombre: formData.get('nombre'),
                        correo: formData.get('correo'),
                        telefono: formData.get('telefono'),
                        mensaje: formData.get('mensaje'),
                    }),
                }));
                const respuestas = await Promise.all(envios);
                const fallida = respuestas.find((r) => !r.ok);
                if (fallida) {
                    const data = await fallida.json().catch(() => null);
                    throw new Error(data && data.error ? data.error : 'No se pudo enviar la cotización.');
                }
            } else {
                const resp = await fetch('/api/opiniones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        producto_id: productosActuales[0].id,
                        nombre: formData.get('nombre'),
                        correo: formData.get('correo'),
                        calificacion: Number(formData.get('calificacion')),
                        mensaje: formData.get('mensaje'),
                    }),
                });
                if (!resp.ok) {
                    const data = await resp.json().catch(() => null);
                    throw new Error(data && data.error ? data.error : 'No se pudo enviar la opinión.');
                }
            }

            status.textContent = esCotizacion
                ? 'Listo, tu solicitud fue enviada. Te contactaremos pronto.'
                : 'Gracias por tu opinión, se publicará después de ser revisada.';
            status.classList.add('is-success');
            form.reset();

            if (esCotizacion) {
                seleccionCotizacion.clear();
                document.querySelectorAll('.catalog-item__check:checked').forEach((c) => { c.checked = false; });
                actualizarBarra();
            }

            setTimeout(() => dialog.close(), 1600);
        } catch (err) {
            status.textContent = err.message || 'Ocurrió un error al enviar. Intenta de nuevo.';
            status.classList.add('is-error');
            console.error(err);
        }
    });
}
