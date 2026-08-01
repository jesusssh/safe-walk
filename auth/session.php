<?php

header("Content-Type: application/json");

session_start();


if(isset($_SESSION["id_usuario"])){


    echo json_encode([

        "success"=>true,
        "usuario"=>[
            "id_usuario"=>$_SESSION["id_usuario"],
            "nombre"=>$_SESSION["nombre"],
            "usuario"=>$_SESSION["usuario"],
            "correo"=>$_SESSION["correo"]
        ]

    ]);


}else{


    echo json_encode([

        "success"=>false,
        "message"=>"No hay sesión activa."

    ]);

}

?>