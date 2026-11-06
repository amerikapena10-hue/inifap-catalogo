const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function texto(valor) {
    return typeof valor === 'string' ? valor.trim() : '';
}

function esCorreoValido(valor) {
    return EMAIL_RE.test(texto(valor));
}

module.exports = { texto, esCorreoValido };
