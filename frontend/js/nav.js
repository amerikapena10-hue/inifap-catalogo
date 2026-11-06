// Menu de navegacion colapsable (hamburguesa) para pantallas angostas.
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const abierto = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(abierto));
    });

    nav.querySelectorAll('.site-nav__link').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
