document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar y aplicar Tema Guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Cargar y aplicar Idioma Guardado
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    const lang = (idiomaGuardado === 'English' || idiomaGuardado === 'en') ? 'en' : 'es';

    document.querySelectorAll('[data-es]').forEach(elem => {
        if (elem.dataset[lang]) {
            elem.textContent = elem.dataset[lang];
        }
    });

    // 3. Lógica para Agregar Contactos
    const btnAgregar = document.getElementById('btnAgregarContacto');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', agregarContacto);
    }
});

function agregarContacto() {
    const nombre = document.getElementById('nombreContacto').value.trim();
    const numero = document.getElementById('numContacto').value.trim();
    const lang = localStorage.getItem('idioma') || 'es';

    if (!nombre || !numero) {
        const msgErr = (lang === 'en' || lang === 'English') 
            ? 'Please fill in all fields.' 
            : 'Por favor completa todos los campos.';
        alert(msgErr);
        return;
    }

    const lista = document.getElementById('listaContactos');
    if (lista) {
        const div = document.createElement('div');
        div.className = 'card-contacto';
        div.innerHTML = `
            <div>
                <strong>${nombre}</strong>
                <p>${numero}</p>
            </div>
            <button class="btn-eliminar" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        lista.appendChild(div);

        // Limpiar inputs
        document.getElementById('nombreContacto').value = '';
        document.getElementById('numContacto').value = '';
    }
}

function volverPerfil() {
    window.location.href = 'miperfil.html';
}