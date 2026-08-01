<?php

header("Content-Type: application/json");

session_start();

require_once("../config/conexion.php");

$database = new Database();
$db = $database->getConnection();


try {


    $correo = trim($_POST["correo"] ?? "");
    $password = trim($_POST["password"] ?? "");


    if(empty($correo) || empty($password)){


        echo json_encode([

            "success"=>false,
            "message"=>"Complete todos los campos."

        ]);

        exit;

    }



    $sql = "SELECT 
                id_usuario,
                nombre,
                apellido,
                usuario,
                correo,
                password_hash,
                estado
            FROM usuarios
            WHERE correo = :correo";


    $stmt = $db->prepare($sql);

    $stmt->bindParam(":correo",$correo);

    $stmt->execute();


    if($stmt->rowCount() == 0){


        echo json_encode([

            "success"=>false,
            "message"=>"Correo o contraseña incorrectos."

        ]);

        exit;

    }



    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);



    if($usuario["estado"] == "suspendido"){


        echo json_encode([

            "success"=>false,
            "message"=>"La cuenta está suspendida."

        ]);

        exit;

    }



    if(!password_verify($password,$usuario["password_hash"])){


        echo json_encode([

            "success"=>false,
            "message"=>"Correo o contraseña incorrectos."

        ]);

        exit;

    }



    $_SESSION["id_usuario"] = $usuario["id_usuario"];
    $_SESSION["nombre"] = $usuario["nombre"];
    $_SESSION["usuario"] = $usuario["usuario"];
    $_SESSION["correo"] = $usuario["correo"];



    echo json_encode([

        "success"=>true,
        "message"=>"Inicio de sesión correcto."

    ]);



}catch(PDOException $e){


    echo json_encode([

        "success"=>false,
        "message"=>"Error al iniciar sesión."

    ]);

}

?>