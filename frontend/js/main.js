function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-form-status');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        status.textContent = '';
        status.className = 'contact-form__status';

        const formData = new FormData(form);
        const payload = {
            nombre: formData.get('nombre'),
            correo: formData.get('correo'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje'),
            tipo: 'contacto',
        };

        try {
            const resp = await fetch('/api/mensajes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!resp.ok) {
                const data = await resp.json().catch(() => null);
                throw new Error(data && data.error ? data.error : 'No se pudo enviar el mensaje.');
            }

            form.reset();
            status.textContent = 'Gracias, tu mensaje fue enviado. Te contactaremos pronto.';
            status.classList.add('is-success');
        } catch (err) {
            status.textContent = err.message || 'Ocurrió un error al enviar tu mensaje. Intenta de nuevo.';
            status.classList.add('is-error');
            console.error(err);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});
