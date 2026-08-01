<?php

header("Content-Type: application/json");

require_once("../config/conexion.php");

$database = new Database();
$db = $database->getConnection();

try {

    $nombre = trim($_POST["nombre"] ?? "");
    $apellido = trim($_POST["apellido"] ?? "");
    $usuario = trim($_POST["usuario"] ?? "");
    $correo = trim($_POST["correo"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if (
        empty($nombre) ||
        empty($apellido) ||
        empty($usuario) ||
        empty($correo) ||
        empty($password)
    ) {

        echo json_encode([
            "success" => false,
            "message" => "Todos los campos son obligatorios."
        ]);
        exit;
    }

    // Verificar correo

    $sql = "SELECT id_usuario FROM usuarios WHERE correo = :correo";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":correo", $correo);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        echo json_encode([
            "success" => false,
            "message" => "El correo ya está registrado."
        ]);
        exit;
    }

    // Verificar usuario

    $sql = "SELECT id_usuario FROM usuarios WHERE usuario = :usuario";

    $stmt = $db->prepare($sql);
    $stmt->bindParam(":usuario", $usuario);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        echo json_encode([
            "success" => false,
            "message" => "El nombre de usuario ya existe."
        ]);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios
    (
        nombre,
        apellido,
        correo,
        usuario,
        password_hash
    )
    VALUES
    (
        :nombre,
        :apellido,
        :correo,
        :usuario,
        :password_hash
    )";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":nombre"=>$nombre,
        ":apellido"=>$apellido,
        ":correo"=>$correo,
        ":usuario"=>$usuario,
        ":password_hash"=>$passwordHash
    ]);

    echo json_encode([
        "success"=>true,
        "message"=>"Usuario registrado correctamente."
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success"=>false,
        "message"=>"Error: ".$e->getMessage()
    ]);

}