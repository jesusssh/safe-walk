const input = document.getElementById("subirFoto");
const perfil = document.getElementById("perfil");

input.addEventListener("change", function () {
    const archivo = this.files[0];

    if (archivo) {
        perfil.src = URL.createObjectURL(archivo);
    }
});