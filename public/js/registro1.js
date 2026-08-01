const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", guardar);

async function guardar(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const terminos = document.getElementById("terminos").checked;

    if(
        nombre=="" ||
        apellido=="" ||
        usuario=="" ||
        correo=="" ||
        password==""
    ){

        alert("Complete todos los campos.");
        return;
    }

    if(password !== confirmar){

        alert("Las contraseñas no coinciden.");
        return;
    }

    if(!terminos){

        alert("Debe aceptar los términos.");
        return;
    }

    const datos = new FormData();

    datos.append("nombre",nombre);
    datos.append("apellido",apellido);
    datos.append("usuario",usuario);
    datos.append("correo",correo);
    datos.append("password",password);

    try{

        const respuesta = await fetch("../auth/registro.php",{

            method:"POST",
            body:datos

        });

        const resultado = await respuesta.json();

        if(resultado.success){

            alert(resultado.message);

            formulario.reset();

            window.location.href="inicio2.html";

        }else{

            alert(resultado.message);

        }

    }catch(error){

        console.error(error);

        alert("Error de conexión con el servidor.");

    }

}