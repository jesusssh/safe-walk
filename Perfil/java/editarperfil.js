const foto = document.getElementById("fotoPerfil");
const input = document.getElementById("nuevaFoto");





input.addEventListener("change", function(){

    const archivo = this.files[0];

    if(archivo){

        const lector = new FileReader();

        lector.onload = function(e){

            foto.src = e.target.result;

        }

        lector.readAsDataURL(archivo);

    }

});

document.getElementById("guardar").addEventListener("click",()=>{

    alert("Cambios guardados correctamente.");

});

document.getElementById("cancelar").addEventListener("click",()=>{

    window.location.href="miperfil.html";

});
