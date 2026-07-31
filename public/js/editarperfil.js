// --- 1. DICCIONARIO DE TRADUCCIONES ---
const traduccionesEditar = {
    Español: {
        titulo: "Editar Perfil",
        nombre: "Nombre completo",
        placeholderNombre: "Ingrese su nombre",
        apellido: "Apellido",
        placeholderApellido: "Ingrese su apellido",
        correo: "Correo electrónico",
        placeholderCorreo: "correo@ejemplo.com",
        telefono: "Teléfono",
        placeholderTelefono: "0000-0000",
        password: "Nueva Contraseña",
        btnGuardar: "Guardar Cambios",
        btnCancelar: "Cancelar",
        alertaGuardar: "Cambios guardados correctamente."
    },
    English: {
        titulo: "Edit Profile",
        nombre: "Full Name",
        placeholderNombre: "Enter your name",
        apellido: "Last Name",
        placeholderApellido: "Enter your last name",
        correo: "Email Address",
        placeholderCorreo: "email@example.com",
        telefono: "Phone Number",
        placeholderTelefono: "0000-0000",
        password: "New Password",
        btnGuardar: "Save Changes",
        btnCancelar: "Cancel",
        alertaGuardar: "Changes saved successfully."
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
    aplicarTraduccionEditar(idiomaGuardado);
});

function aplicarTraduccionEditar(idioma) {
    const t = traduccionesEditar[idioma];
    if (!t) return;

    // Traduce el encabezado
    if (document.getElementById('lblTituloEditar')) {
        document.getElementById('lblTituloEditar').innerText = t.titulo;
    }

    // Traduce las etiquetas (Labels)
    if (document.getElementById('lblNombreLabel')) document.getElementById('lblNombreLabel').innerText = t.nombre;
    if (document.getElementById('lblApellido')) document.getElementById('lblApellido').innerText = t.apellido;
    if (document.getElementById('lblCorreoLabel')) document.getElementById('lblCorreoLabel').innerText = t.correo;
    if (document.getElementById('lblTelefono')) document.getElementById('lblTelefono').innerText = t.telefono;
    if (document.getElementById('lblNuevaContraseña')) document.getElementById('lblNuevaContraseña').innerText = t.password;

    // Traduce los textos de ejemplo (Placeholders)
    if (document.getElementById('nombre')) document.getElementById('nombre').placeholder = t.placeholderNombre;
    if (document.getElementById('apellido')) document.getElementById('apellido').placeholder = t.placeholderApellido;
    if (document.getElementById('correo')) document.getElementById('correo').placeholder = t.placeholderCorreo;
    if (document.getElementById('telefono')) document.getElementById('telefono').placeholder = t.placeholderTelefono;

    // Traduce los botones
    if (document.getElementById('guardar')) document.getElementById('guardar').innerText = t.btnGuardar;
    if (document.getElementById('cancelar')) document.getElementById('cancelar').innerText = t.btnCancelar;
}

// --- 3. CAMBIAR FOTO DE PERFIL ---
const foto = document.getElementById("fotoPerfil");
const input = document.getElementById("nuevaFoto");

if (input && foto) {
    input.addEventListener("change", function () {
        const archivo = this.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = function (e) {
                foto.src = e.target.result;
            };
            lector.readAsDataURL(archivo);
        }
    });
}

// --- 4. ACCIONES DE LOS BOTONES ---
const btnGuardar = document.getElementById("guardar");
if (btnGuardar) {
    btnGuardar.addEventListener("click", () => {
        const idioma = localStorage.getItem('idiomaApp') || 'Español';
        alert(traduccionesEditar[idioma].alertaGuardar);
    });
}

const btnCancelar = document.getElementById("cancelar");
if (btnCancelar) {
    btnCancelar.addEventListener("click", () => {
        window.location.href = "miperfil.html";
    });
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






