
const inputFoto = document.getElementById("subirFoto");
const imagenPerfil = document.getElementById("perfil");

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


const btnReportes = document.getElementById("btnReportes");
const btnEditar = document.getElementById("btnEditar");
const btnContactos = document.getElementById("btnContactos");
const btnConfiguracion = document.getElementById("btnConfiguracion");
const btnCerrar = document.getElementById("btnCerrar");


btnReportes.addEventListener("click", () => {

    window.location.href = "misReportes.html";

});


btnEditar.addEventListener("click", () => {

    window.location.href = "editarPerfil.html";

});


btnContactos.addEventListener("click", () => {

    window.location.href = "contactos.html";

});


btnConfiguracion.addEventListener("click", () => {

    window.location.href = "configuracion.html";

});


btnCerrar.addEventListener("click", () => {

    const respuesta = confirm("¿Deseas cerrar sesión?");

    if (respuesta) {

        window.location.href = "index.html";

    }

});

function editarPerfil(){
    window.location.href = "editarPerfil.html";
}
function volverPerfil(){
    window.location.href = "miperfil.html";
}





