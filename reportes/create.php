<?php

header("Content-Type: application/json");

require_once("../config/conexion.php");

$database = new Database();
$db = $database->getConnection();

try{

    $datos =
        json_decode(
            file_get_contents(
                "php://input"
            ),
            true
        );

    $id_tipo_riesgo =
        $datos["id_tipo_riesgo"] ?? null;

    $descripcion =
        trim(
            $datos["descripcion"] ?? ""
        );

    $latitud =
        $datos["latitud"] ?? null;

    $longitud =
        $datos["longitud"] ?? null;

    if(
        !$id_tipo_riesgo ||
        !$descripcion ||
        !$latitud ||
        !$longitud
    ){

        echo json_encode([

            "success" => false,

            "message" =>
                "Faltan datos."

        ]);

        exit;
    }

    $sql = "
        INSERT INTO reportes
        (
            id_usuario,
            id_tipo_riesgo,
            titulo,
            descripcion,
            latitud,
            longitud
        )
        VALUES
        (
            :id_usuario,
            :id_tipo_riesgo,
            :titulo,
            :descripcion,
            :latitud,
            :longitud
        )
    ";

    $stmt =
        $db->prepare($sql);

    $stmt->execute([

        ":id_usuario" => 1,

        ":id_tipo_riesgo" =>
            $id_tipo_riesgo,

        ":titulo" =>
            "Reporte ciudadano",

        ":descripcion" =>
            $descripcion,

        ":latitud" =>
            $latitud,

        ":longitud" =>
            $longitud

    ]);

    echo json_encode([

        "success" => true,

        "message" =>
            "Reporte guardado correctamente."

    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}