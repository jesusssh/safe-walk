document.addEventListener('DOMContentLoaded', () => {

    const temaGuardado = localStorage.getItem('temaApp') || 'claro';

    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }


    const idiomaGuardado = localStorage.getItem('idioma') || 'es';

    const lang = (idiomaGuardado === 'English' || idiomaGuardado === 'en')
        ? 'en'
        : 'es';


    document.querySelectorAll('[data-es]').forEach(elem => {

        if (elem.dataset[lang]) {
            elem.textContent = elem.dataset[lang];
        }

    });

});


function editarContacto(contacto) {

    window.location.href =
        'editarcontacto.html?contacto=' + encodeURIComponent(contacto);

}


function volverPerfil() {

    window.location.href = 'miperfil.html';

}