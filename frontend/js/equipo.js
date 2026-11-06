const EQUIPO = [
    { puesto: 'Director de coordinación y vinculación', grado: 'Doctorado', nombre: 'Jiménez Ocampo Rafael', programa: 'Carne de Bovinos', correo: 'jimenez.rafael@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Jiménez Galindo José Cruz', programa: 'Frijol', correo: 'jimenez.cruz@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Carnero Avilés Leslie', programa: 'Parasitología Agrícola', correo: 'carnero.leslie@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Domínguez Martínez Pablo Alfredo', programa: 'Forrajes', correo: 'dominguez.pablo@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'García Rodríguez José Leonardo', programa: 'Ciencias Forestales', correo: 'garcia.leonardo@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Maestría', nombre: 'Martínez Fernández Maihualy', programa: 'Fitosanidad', correo: 'martinez.maihualy@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Monárrez González José Carlos', programa: 'Manejo Forestal y Servicios Ecosistémicos', correo: 'monarrez.jose@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Quiñónez Barraza Gerónimo', programa: 'Manejo Forestal', correo: 'quinonez.geronimo@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Maestría', nombre: 'Ramírez Valadez María Gabriela', programa: 'Nutrición Vegetal', correo: 'ramirez.maria@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Ríos Saucedo Julio César', programa: 'Dendroenergía', correo: 'rios.julio@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Rosales Serna Rigoberto', programa: 'Genética Y Botánica', correo: 'rosales.rigoberto@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Sarmiento López Homero', programa: 'Química De Productos Naturales', correo: 'sarmiento.homero@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Maestría', nombre: 'Sierra Zurita Donají', programa: 'Fruticultura', correo: 'sierra.donaji@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Sigala Rodríguez José Ángel', programa: 'Conservación Y Restauración De Ecosistemas', correo: 'sigala.jose@inifap.gob.mx' },
    { puesto: 'Investigador', grado: 'Doctorado', nombre: 'Juan Bautista Rentería Ánima', programa: 'Manejo Forestal y Servicios Ecosistémicos', correo: 'renteria.juan@inifap.gob.mx' },
];

function iniciales(nombre) {
    const partes = nombre.trim().split(/\s+/);
    const primera = partes[0]?.[0] || '';
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primera + ultima).toUpperCase();
}

function renderLider(persona) {
    const contenedor = document.getElementById('team-lead');
    contenedor.innerHTML = `
        <div class="team-lead">
            <div class="team-lead__avatar">${iniciales(persona.nombre)}</div>
            <div class="team-lead__info">
                <span class="team-lead__badge">${persona.puesto}</span>
                <h3>${persona.nombre}</h3>
                <p>${persona.grado} · ${persona.programa}</p>
                <p><a href="mailto:${persona.correo}">${persona.correo}</a></p>
            </div>
        </div>
    `;
}

function renderEquipo(personas) {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = personas.map((p) => `
        <article class="team-card">
            <div class="team-card__head">
                <h3 class="team-card__name">${p.nombre}</h3>
                <span class="team-card__grado">${p.grado}</span>
            </div>
            <p class="team-card__programa">Programa: <strong>${p.programa}</strong></p>
            <a class="team-card__email" href="mailto:${p.correo}">&#9993; ${p.correo}</a>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const lider = EQUIPO.find((p) => p.puesto !== 'Investigador') || EQUIPO[0];
    const resto = EQUIPO.filter((p) => p !== lider);
    renderLider(lider);
    renderEquipo(resto);
});
