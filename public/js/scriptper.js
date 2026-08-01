// --- DICCIONARIO DE TRADUCCIONES ---
const traduccionesPerfil = {
    es: {
        titulo: "Mi Perfil",
        nombre: "Nombre Completo",
        correo: "correo@ejemplo.com",
        lblReportes: "Reportes",
        lblContactos: "Contactos",
        reportes: "Mis Reportes",
        editar: "Editar Perfil",
        contactos: "Contactos de Emergencia",
        configuracion: "Configuración",
        cerrarSesion: "Cerrar Sesión"
    },
    en: {
        titulo: "My Profile",
        nombre: "Full Name",
        correo: "email@example.com",
        lblReportes: "Reports",
        lblContactos: "Contacts",
        reportes: "My Reports",
        editar: "Edit Profile",
        contactos: "Emergency Contacts",
        configuracion: "Settings",
        cerrarSesion: "Log Out"
    }
};

// --- CARGA DE LA PÁGINA (TEMA E IDIOMA) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicar Tema Guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Aplicar Idioma Guardado (Acepta 'es' / 'en' o 'Español' / 'English')
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    const claveIdioma = (idiomaGuardado === 'English' || idiomaGuardado === 'en') ? 'en' : 'es';
    
    // Traducción por HTML attributes (data-es / data-en)
    document.querySelectorAll('[data-es]').forEach(elem => {
        if (elem.dataset[claveIdioma]) {
            elem.textContent = elem.dataset[claveIdioma];
        }
    });

    // Traducción por objeto JS
    aplicarTraduccionPerfil(claveIdioma);

    // 3. Inicializar eventos de fotos y botones
    inicializarEventos();
});

// --- FUNCIÓN DE TRADUCCIÓN ---
function aplicarTraduccionPerfil(idioma) {
    const t = traduccionesPerfil[idioma];
    if (!t) return;

    if (document.getElementById('lblTituloPerfil')) document.getElementById('lblTituloPerfil').innerText = t.titulo;
    if (document.getElementById('nombreUsuario')) document.getElementById('nombreUsuario').innerText = t.nombre;
    if (document.getElementById('correoUsuario')) document.getElementById('correoUsuario').innerText = t.correo;

    if (document.getElementById('lblEstadisticaReportes')) document.getElementById('lblEstadisticaReportes').innerText = t.lblReportes;
    if (document.getElementById('lblEstadisticaContactos')) document.getElementById('lblEstadisticaContactos').innerText = t.lblContactos;

    if (document.getElementById('lblMisReportes')) document.getElementById('lblMisReportes').innerText = t.reportes;
    if (document.getElementById('lblEditarPerfil')) document.getElementById('lblEditarPerfil').innerText = t.editar;
    if (document.getElementById('lblContactos')) document.getElementById('lblContactos').innerText = t.contactos;
    if (document.getElementById('lblConfiguracion')) document.getElementById('lblConfiguracion').innerText = t.configuracion;
    if (document.getElementById('lblCerrarSesion')) document.getElementById('lblCerrarSesion').innerText = t.cerrarSesion;
}

// --- EVENTOS DE INTERFAZ Y NAVEGACIÓN ---
function inicializarEventos() {
    // Cambiar Foto de Perfil
    const inputFoto = document.getElementById("subirFoto");
    const imagenPerfil = document.getElementById("perfil");

    if (inputFoto && imagenPerfil) {
        inputFoto.addEventListener("change", function () {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = (e) => imagenPerfil.src = e.target.result;
                lector.readAsDataURL(archivo);
            }
        });
    }

    // Botones de Navegación
    const btnVolver = document.getElementById("btnVolver");
    const btnReportes = document.getElementById("btnReportes");
    const btnEditar = document.getElementById("btnEditar");
    const btnContactos = document.getElementById("btnContactos");
    const btnConfiguracion = document.getElementById("btnConfiguracion");
    const btnCerrar = document.getElementById("btnCerrar");

    if (btnVolver) btnVolver.addEventListener("click", () => window.location.href = "mp.html");
    if (btnReportes) btnReportes.addEventListener("click", () => window.location.href = "misReportes.html");
    if (btnEditar) btnEditar.addEventListener("click", () => window.location.href = "editarperfil.html");
    if (btnContactos) btnContactos.addEventListener("click", () => window.location.href = "contac.html");
    if (btnConfiguracion) btnConfiguracion.addEventListener("click", () => window.location.href = "configuracion.html");

    // Cerrar Sesión
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            const lang = localStorage.getItem('idioma') || 'es';
            const msg = (lang === 'en' || lang === 'English') ? "Do you want to log out?" : "¿Deseas cerrar sesión?";
            if (confirm(msg)) {
                window.location.href = "inicio2.html";
            }
        });
    }
}

// --- FUNCIONES GLOBALES ---
function editarPerfil() {
    window.location.href = "editarperfil.html";
}

function volverPerfil() {
    window.location.href = "miperfil.html";
}