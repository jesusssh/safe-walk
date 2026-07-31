const traduccionesPerfil = {
    Español: {
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
    English: {
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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicar tema guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Aplicar idioma guardado
    const idiomaGuardado = localStorage.getItem('idiomaApp') || 'Español';
    aplicarTraduccionPerfil(idiomaGuardado);

    inicializarEventos();
});

function aplicarTraduccionPerfil(idioma) {
    const t = traduccionesPerfil[idioma];
    if (!t) return;

    // Header y Usuario
    if (document.getElementById('lblTituloPerfil')) document.getElementById('lblTituloPerfil').innerText = t.titulo;
    if (document.getElementById('nombreUsuario')) document.getElementById('nombreUsuario').innerText = t.nombre;
    if (document.getElementById('correoUsuario')) document.getElementById('correoUsuario').innerText = t.correo;

    // Tarjetas de Estadísticas (Reportes y Contactos)
    if (document.getElementById('lblEstadisticaReportes')) document.getElementById('lblEstadisticaReportes').innerText = t.lblReportes;
    if (document.getElementById('lblEstadisticaContactos')) document.getElementById('lblEstadisticaContactos').innerText = t.lblContactos;

    // Lista de Opciones
    if (document.getElementById('lblMisReportes')) document.getElementById('lblMisReportes').innerText = t.reportes;
    if (document.getElementById('lblEditarPerfil')) document.getElementById('lblEditarPerfil').innerText = t.editar;
    if (document.getElementById('lblContactos')) document.getElementById('lblContactos').innerText = t.contactos;
    if (document.getElementById('lblConfiguracion')) document.getElementById('lblConfiguracion').innerText = t.configuracion;
    if (document.getElementById('lblCerrarSesion')) document.getElementById('lblCerrarSesion').innerText = t.cerrarSesion;
}

function inicializarEventos() {
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

    const btnVolver = document.getElementById("btnVolver");
    const btnReportes = document.getElementById("btnReportes");
    const btnEditar = document.getElementById("btnEditar");
    const btnContactos = document.getElementById("btnContactos");
    const btnConfiguracion = document.getElementById("btnConfiguracion");
    const btnCerrar = document.getElementById("btnCerrar");

    if (btnVolver) btnVolver.addEventListener("click", () => window.location.href = "mp.html");
    if (btnReportes) btnReportes.addEventListener("click", () => window.location.href = "misReportes.html");
    if (btnEditar) btnEditar.addEventListener("click", () => window.location.href = "editarPerfil.html");
    if (btnContactos) btnContactos.addEventListener("click", () => window.location.href = "contac.html");
    if (btnConfiguracion) btnConfiguracion.addEventListener("click", () => window.location.href = "configuracion.html");

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            const idioma = localStorage.getItem('idiomaApp') || 'Español';
            const msg = idioma === 'English' ? "Do you want to log out?" : "¿Deseas cerrar sesión?";
            if (confirm(msg)) window.location.href = "index.html";
        });
    }
}
 
// --- 3. NAVEGACIÓN Y BOTONES ---
const btnReportes = document.getElementById("btnReportes");
const btnEditar = document.getElementById("btnEditar");
const btnContactos = document.getElementById("btnContactos");
const btnConfiguracion = document.getElementById("btnConfiguracion");
const btnCerrar = document.getElementById("btnCerrar");
 
if (btnReportes) {
    btnReportes.addEventListener("click", () => {
        window.location.href = "misReportes.html";
    });
}
 
if (btnEditar) {
    btnEditar.addEventListener("click", () => {
        window.location.href = "editarPerfil.html";
    });
}
 
if (btnContactos) {
    btnContactos.addEventListener("click", () => {
        window.location.href = "contac.html";
    });
}
 
if (btnConfiguracion) {
    btnConfiguracion.addEventListener("click", () => {
        window.location.href = "configuracion.html";
    });
}
 
if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
        const idiomaActual = localStorage.getItem('idiomaApp') || 'Español';
        const mensaje = idiomaActual === 'English' ? "Do you want to log out?" : "¿Deseas cerrar sesión?";
        
        const respuesta = confirm(mensaje);
        if (respuesta) {
            window.location.href = "index.html";
        }
    });
}
 
// --- 4. FUNCIONES GLOBALES ---
function editarPerfil() {
    window.location.href = "editarPerfil.html";
}
 
function volverPerfil() {
    window.location.href = "miperfil.html";
}








document.addEventListener('DOMContentLoaded', () => {
    // 1. Leer qué tema está guardado (si no hay ninguno, usa 'claro' por defecto)
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';

    // 2. Aplicar o quitar la clase dark-mode automáticamente
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});