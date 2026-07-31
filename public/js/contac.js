// --- 1. DICCIONARIO DE TRADUCCIONES ---
const traduccionesContactos = {
    Español: {
        titulo: "Contactos de Emergencia",
        mama: "Mamá",
        papa: "Papá",
        amiga: "Mejor Amiga",
        btnAgregar: "Agregar Nuevo Contacto",
        alertaAgregar: "Función para agregar un nuevo contacto"
    },
    English: {
        titulo: "Emergency Contacts",
        mama: "Mom",
        papa: "Dad",
        amiga: "Best Friend",
        btnAgregar: "Add New Contact",
        alertaAgregar: "Function to add a new contact"
    }
};

// --- 2. CARGAR TEMA E IDIOMA AL ABRIR LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplica el tema oscuro/claro guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    }

    // 2. Aplica la traducción guardada
    const idiomaGuardado = localStorage.getItem('idiomaApp') || 'Español';
    aplicarTraduccionContactos(idiomaGuardado);
});

function aplicarTraduccionContactos(idioma) {
    const t = traduccionesContactos[idioma];
    if (!t) return;

    if (document.getElementById('lblTituloContactos')) {
        document.getElementById('lblTituloContactos').innerText = t.titulo;
    }
    if (document.getElementById('lblContactoMama')) {
        document.getElementById('lblContactoMama').innerText = t.mama;
    }
    if (document.getElementById('lblContactoPapa')) {
        document.getElementById('lblContactoPapa').innerText = t.papa;
    }
    if (document.getElementById('lblContactoAmiga')) {
        document.getElementById('lblContactoAmiga').innerText = t.amiga;
    }
    if (document.getElementById('lblBtnAgregar')) {
        document.getElementById('lblBtnAgregar').innerText = t.btnAgregar;
    }
}

// --- 3. FUNCIONES DE BOTONES ---
function volverPerfil() {
    window.location.href = "miperfil.html";
}

function agregarContacto() {
    const idiomaActual = localStorage.getItem('idiomaApp') || 'Español';
    alert(traduccionesContactos[idiomaActual].alertaAgregar);
}