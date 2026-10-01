<?php

session_start();

header("Content-Type: application/json");

require_once("../config/conexion.php");

if(!isset($_SESSION["id_usuario"])){

    echo json_encode([
        "success" => false,
        "message" => "No active session."
    ]);

    exit;
}

try{

    $database = new Database();
    $db = $database->getConnection();

    $stmt = $db->prepare(

        "SELECT

            r.id_reporte,
            r.descripcion,
            r.fecha_reporte,
            t.nombre_tipo

        FROM reportes r

        INNER JOIN tipos_riesgo t
        ON r.id_tipo_riesgo = t.id_tipo_riesgo

        WHERE r.id_usuario = ?

        ORDER BY r.fecha_reporte DESC"

    );

    $stmt->execute([
        $_SESSION["id_usuario"]
    ]);

    $reportes =
        $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );

    echo json_encode([

        "success" => true,

        "reportes" => $reportes

    ]);

}
catch(Exception $e){

    echo json_encode([

        "success" => false,

        "message" =>
            $e->getMessage()

    ]);

}