const formulario = document.getElementById("formLogin");


formulario.addEventListener("submit", iniciarSesion);



async function iniciarSesion(e){

    e.preventDefault();


    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value;



    if(correo=="" || password==""){


        alert("Complete todos los campos.");

        return;

    }



    const datos = new FormData();


    datos.append("correo",correo);

    datos.append("password",password);



    try{


        const respuesta = await fetch("../auth/login.php",{


            method:"POST",

            body:datos


        });



        const resultado = await respuesta.json();



        if(resultado.success){


            //alert(resultado.message);
            document.getElementById("mensaje").innerHTML = resultado.message;



            window.location.href="mp.html";


        }else{


            //alert(resultado.message);
            document.getElementById("mensaje").innerHTML = resultado.message;

        }



    }catch(error){


        console.error(error);


        alert("Error de conexión con el servidor.");


    }


}