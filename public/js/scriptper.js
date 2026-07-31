// --- 1. DICCIONARIO Y TRADUCCIÓN AUTO DE PERFIL ---
const traduccionesPerfil = {
    Español: {
        titulo: "Mi Perfil",
        reportes: "Mis Reportes",
        editar: "Editar Perfil",
        contactos: "Contactos de Emergencia",
        configuracion: "Configuración",
        cerrarSesion: "Cerrar Sesión"
    },
    English: {
        titulo: "My Profile",
        reportes: "My Reports",
        editar: "Edit Profile",
        contactos: "Emergency Contacts",
        configuracion: "Settings",
        cerrarSesion: "Log Out"
    }
};

// --- INICIALIZACIÓN AL CARGAR LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicar tema guardado (Claro/Oscuro)
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    }

    // 2. Aplicar idioma guardado (Español/English)
    const idiomaGuardado = localStorage.getItem('idiomaApp') || 'Español';
    aplicarTraduccionPerfil(idiomaGuardado);
});

function aplicarTraduccionPerfil(idioma) {
    const t = traduccionesPerfil[idioma];
    if (!t) return;

    if (document.getElementById('lblTituloPerfil')) document.getElementById('lblTituloPerfil').innerText = t.titulo;
    if (document.getElementById('lblMisReportes')) document.getElementById('lblMisReportes').innerText = t.reportes;
    if (document.getElementById('lblEditarPerfil')) document.getElementById('lblEditarPerfil').innerText = t.editar;
    if (document.getElementById('lblContactos')) document.getElementById('lblContactos').innerText = t.contactos;
    if (document.getElementById('lblConfiguracion')) document.getElementById('lblConfiguracion').innerText = t.configuracion;
    if (document.getElementById('lblCerrarSesion')) document.getElementById('lblCerrarSesion').innerText = t.cerrarSesion;
}

// --- 2. PREVISUALIZACIÓN DE FOTO DE PERFIL ---
const inputFoto = document.getElementById("subirFoto");
const imagenPerfil = document.getElementById("perfil");

if (inputFoto && imagenPerfil) {
    inputFoto.addEventListener("change", function () {
        const archivo = this.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = function (e) {
                imagenPerfil.src = e.target.result;
            };
            lector.readAsDataURL(archivo);
        }
    });
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