document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar y aplicar Tema Guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    aplicarTema(temaGuardado);

    // 2. Cargar Idioma Guardado y seleccionar la opción correcta
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    const selectIdioma = document.getElementById('selectIdioma');

    if (selectIdioma) {
        selectIdioma.value = (idiomaGuardado === 'en' || idiomaGuardado === 'English') ? 'English' : 'Español';
    }

    // 3. Cargar Unidad Guardada en el selector
    const selectUnidades = document.getElementById('selectUnidades');
    const unidadGuardada = localStorage.getItem('unidadDistancia') || 'km';
    if (selectUnidades) {
        selectUnidades.value = unidadGuardada;
    }

    // Traducir los elementos al cargar la pantalla
    aplicarTraduccionConfiguracion(idiomaGuardado);

    // 4. Activar el evento para cambiar de Tema
    const btnCambiarTema = document.getElementById('btnCambiarTema');
    if (btnCambiarTema) {
        btnCambiarTema.addEventListener('click', () => {
            const esOscuro = document.body.classList.contains('dark-mode');
            const nuevoTema = esOscuro ? 'claro' : 'oscuro';

            localStorage.setItem('temaApp', nuevoTema);
            aplicarTema(nuevoTema);
        });
    }
});

// Función que se ejecuta al cambiar la opción del desplegable de idioma
function cambiarIdioma(nuevoIdioma) {
    const claveIdioma = (nuevoIdioma === "English" || nuevoIdioma === "en") ? "en" : "es";
    localStorage.setItem("idioma", claveIdioma);

    // Traducir inmediatamente esta pantalla
    aplicarTraduccionConfiguracion(claveIdioma);
}

// Función que se ejecuta al cambiar el desplegable de unidades
function cambiarUnidad(nuevaUnidad) {
    localStorage.setItem('unidadDistancia', nuevaUnidad);
}

// Función para traducir los textos de configuracion.html
function aplicarTraduccionConfiguracion(lang) {
    const esIngles = (lang === 'en' || lang === 'English');

    // Título superior de la página
    const lblTitulo = document.querySelector('header h1') || document.getElementById('lblTituloConfig');
    if (lblTitulo) lblTitulo.textContent = esIngles ? 'Settings' : 'Configuración';

    // Opciones del menú
    const lblUnidades = document.getElementById('lblUnidades');
    const lblIdioma = document.getElementById('lblIdioma');
    const lblTema = document.getElementById('lblTema');
    const lblAyuda = document.getElementById('lblAyuda');
    const lblAcerca = document.getElementById('lblAcerca');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const optMillas = document.getElementById('optMillas');

    if (lblUnidades) lblUnidades.textContent = esIngles ? 'Distance units' : 'Unidades de distancia';
    if (lblIdioma) lblIdioma.textContent = esIngles ? 'Language' : 'Idioma';
    if (lblTema) lblTema.textContent = esIngles ? 'Theme' : 'Tema';
    if (lblAyuda) lblAyuda.textContent = esIngles ? 'Help & support' : 'Ayuda y soporte';
    if (lblAcerca) lblAcerca.textContent = esIngles ? 'About SafeWalk' : 'Acerca de SafeWalk';
    if (optMillas) optMillas.textContent = esIngles ? 'Miles' : 'Millas';

    if (btnCerrarSesion) {
        btnCerrarSesion.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> ${esIngles ? 'Log Out' : 'Cerrar Sesión'}`;
    }

    // Actualiza texto de estado del Tema según idioma
    const temaActual = localStorage.getItem('temaApp') || 'claro';
    aplicarTema(temaActual);
}

// Aplicar colores y textos del Tema
function aplicarTema(tema) {
    const textoEstado = document.getElementById('textoTemaEstado');
    const icono = document.getElementById('iconoTema');
    const idiomaActual = localStorage.getItem('idioma') || 'es';
    const esIngles = (idiomaActual === 'en' || idiomaActual === 'English');

    if (tema === 'oscuro') {
        document.body.classList.add('dark-mode');
        if (textoEstado) textoEstado.textContent = esIngles ? 'Dark' : 'Oscuro';
        if (icono) icono.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        if (textoEstado) textoEstado.textContent = esIngles ? 'Light' : 'Claro';
        if (icono) icono.className = 'fa-solid fa-moon';
    }
}

function volverPerfil() {
    window.location.href = 'miperfil.html';
}