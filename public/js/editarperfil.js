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

    // Cambiar vista previa de foto de perfil
    const inputFoto = document.getElementById('nuevaFoto');
    const imgPerfil = document.getElementById('fotoPerfil');

    if (inputFoto && imgPerfil) {
        inputFoto.addEventListener('change', function () {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = (e) => imgPerfil.src = e.target.result;
                lector.readAsDataURL(archivo);
            }
        });
    }

    // Botón guardar cambios
    const btnGuardar = document.getElementById('guardar');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', () => {
            const msg = lang === 'en' ? 'Changes saved successfully!' : '¡Cambios guardados con éxito!';
            alert(msg);
            window.location.href = 'miperfil.html';
        });
    }
});

// Función de navegación para la flecha de regreso
function volverPerfil() {
    window.location.href = 'miperfil.html';
}