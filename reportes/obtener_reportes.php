<?php

header("Content-Type: application/json");

require_once("../config/conexion.php");

$database = new Database();
$db = $database->getConnection();

try{

$sql = "
    SELECT
        r.id_reporte,
        r.descripcion,
        r.latitud,
        r.longitud,
        t.nombre_tipo
    FROM reportes r
    INNER JOIN tipos_riesgo t
    ON r.id_tipo_riesgo = t.id_tipo_riesgo

    WHERE r.estado_reporte = 'activo'

    AND (
        r.fecha_expiracion IS NULL
        OR
        r.fecha_expiracion > NOW()
    )
";

    $stmt = $db->prepare($sql);

    $stmt->execute();

    $reportes =
        $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "reportes" => $reportes
    ]);

}
catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}