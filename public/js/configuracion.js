// Redirigir a Configuración desde miperfil.html
document.getElementById("btnConfiguracion")?.addEventListener("click", () => {
    window.location.href = "configuracion.html";
});
 
// Regresar a la pantalla de perfil desde configuracion.html
function volverPerfil() {
    window.location.href = "miperfil.html";
}
 
// 1. Diccionario de traducciones
const traducciones = {
    Español: {
        titulo: "Configuración",
        unidades: "Unidades de distancia",
        idioma: "Idioma",
        tema: "Tema",
        ayuda: "Ayuda y soporte",
        acerca: "Acerca de SafeWalk",
        cerrarSesion: "Cerrar Sesión",
        alertaCerrar: "¿Deseas cerrar sesión?"
    },
    English: {
        titulo: "Settings",
        unidades: "Distance units",
        idioma: "Language",
        tema: "Theme",
        ayuda: "Help & support",
        acerca: "About SafeWalk",
        cerrarSesion: "Log Out",
        alertaCerrar: "Do you want to log out?"
    }
};
 
// 2. Función que ejecuta el cambio y guarda en memoria
function cambiarIdioma(idioma) {
    // Guarda el idioma en la memoria local
    localStorage.setItem('idiomaApp', idioma);
 
    // Actualiza el valor del selector si no coincide
    const select = document.getElementById('selectIdioma');
    if (select) {
        select.value = idioma;
    }
 
    // Aplica los textos
    const t = traducciones[idioma];
    if (!t) return;
 
    if (document.querySelector('.header-pagina h1')) {
        document.querySelector('.header-pagina h1').innerText = t.titulo;
    }
    if (document.getElementById('lblUnidades')) document.getElementById('lblUnidades').innerText = t.unidades;
    if (document.getElementById('lblIdioma')) document.getElementById('lblIdioma').innerText = t.idioma;
    if (document.getElementById('lblTema')) document.getElementById('lblTema').innerText = t.tema;
    if (document.getElementById('lblAyuda')) document.getElementById('lblAyuda').innerText = t.ayuda;
    if (document.getElementById('lblAcerca')) document.getElementById('lblAcerca').innerText = t.acerca;
    if (document.getElementById('btnCerrarSesion')) document.getElementById('btnCerrarSesion').innerText = t.cerrarSesion;
}
 
// 3. Se ejecuta en cuanto la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    // Busca si ya había un idioma guardado, si no, usa 'Español'
    const idiomaGuardado = localStorage.getItem('idiomaApp') || 'Español';
    
    // Aplica la traducción guardada
    cambiarIdioma(idiomaGuardado);
 
    // Evento para el botón de Cerrar Sesión
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            const idiomaActual = localStorage.getItem('idiomaApp') || 'Español';
            const mensaje = traducciones[idiomaActual].alertaCerrar;
 
            const respuesta = confirm(mensaje);
            if (respuesta) {
                window.location.href = "inicio2.html";
            }
        });
    }
});





document.addEventListener('DOMContentLoaded', () => {
    // 1. Al cargar la pantalla, revisamos qué tema está guardado actualmente
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    
    // Si estaba en oscuro, le aplicamos la clase al body
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Actualizamos el ícono y el texto del botón según el estado
    actualizarBotonTema(temaGuardado === 'oscuro');

    // 2. Le asignamos la función de clic al botón/fila de Tema
    const btnCambiarTema = document.getElementById('btnCambiarTema');
    if (btnCambiarTema) {
        btnCambiarTema.addEventListener('click', () => {
            // Comprobamos si la página está en modo oscuro actualmente
            const esOscuroAhora = document.body.classList.contains('dark-mode');
            
            // Invertimos el estado (si es oscuro cambia a claro, y viceversa)
            const nuevoEstadoOscuro = !esOscuroAhora;

            if (nuevoEstadoOscuro) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('temaApp', 'oscuro');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('temaApp', 'claro');
            }

            // Cambiamos el texto e ícono del botón
            actualizarBotonTema(nuevoEstadoOscuro);
        });
    }
});

// Función auxiliar para cambiar el ícono (Luna/Sol) y el texto (Claro/Oscuro)
function actualizarBotonTema(esOscuro) {
    const iconoTema = document.getElementById('iconoTema');
    const textoTemaEstado = document.getElementById('textoTemaEstado');

    if (esOscuro) {
        if (iconoTema) iconoTema.className = 'fa-solid fa-sun';      // Muestra Sol si ya está oscuro
        if (textoTemaEstado) textoTemaEstado.innerText = 'Oscuro';
    } else {
        if (iconoTema) iconoTema.className = 'fa-solid fa-moon';     // Muestra Luna si está en claro
        if (textoTemaEstado) textoTemaEstado.innerText = 'Claro';
    }
}