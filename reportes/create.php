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

$fechaExpiracion = null;

switch($id_tipo_riesgo){

    case 1: // Robo

        $fechaExpiracion =
            date(
                "Y-m-d H:i:s",
                strtotime("+1 minute")
            );

    break;

    case 2: // Acoso

        $fechaExpiracion =
            date(
                "Y-m-d H:i:s",
                strtotime("+1 minute")
            );

    break;

    case 3: // Calle Oscura

        $fechaExpiracion =
            date(
                "Y-m-d H:i:s",
                strtotime("+30 days")
            );

    break;

    default:

        $fechaExpiracion =
            date(
                "Y-m-d H:i:s",
                strtotime("+24 hours")
            );

}

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
    longitud,
    fecha_expiracion
)
VALUES
(
    :id_usuario,
    :id_tipo_riesgo,
    :titulo,
    :descripcion,
    :latitud,
    :longitud,
    :fecha_expiracion
)
`
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
            $longitud,

        ":fecha_expiracion" =>
        $fechaExpiracion

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