<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "../config/conexion.php";


/* ==========================================
   VERIFICAR SESIÓN
   ========================================== */

if (!isset($_SESSION["id_usuario"])) {

    echo json_encode([
        "success" => false,
        "message" => "Usuario no autenticado"
    ]);

    exit;
}


/* ==========================================
   OBTENER ID DEL USUARIO
   ========================================== */

$id_usuario = $_SESSION["id_usuario"];


/* ==========================================
   CREAR CONEXIÓN
   ========================================== */

try {

    $database = new Database();

    $conn = $database->getConnection();


    /* ==========================================
       CONSULTA
       ========================================== */

    $sql = "
        SELECT
            r.id_reporte,
            r.titulo,
            r.descripcion,
            r.imagen_url,
            r.latitud,
            r.longitud,
            r.estado_reporte,
            r.fecha_reporte,
            t.nombre_tipo
        FROM reportes r

        INNER JOIN tipos_riesgo t
            ON r.id_tipo_riesgo = t.id_tipo_riesgo

        WHERE r.id_usuario = ?

        ORDER BY r.fecha_reporte DESC
    ";


    /* ==========================================
       PREPARAR CONSULTA
       ========================================== */

    $stmt = $conn->prepare($sql);


    /* ==========================================
       EJECUTAR CONSULTA
       ========================================== */

    $stmt->execute([
        $id_usuario
    ]);


    /* ==========================================
       OBTENER REPORTES
       ========================================== */

    $reportes = $stmt->fetchAll(PDO::FETCH_ASSOC);


    /* ==========================================
       RESPUESTA
       ========================================== */

    echo json_encode([
        "success" => true,
        "reportes" => $reportes
    ]);


} catch (PDOException $e) {


    /* ==========================================
       ERROR DE BASE DE DATOS
       ========================================== */

    echo json_encode([
        "success" => false,
        "message" => "Error en la base de datos",
        "error" => $e->getMessage()
    ]);

}

?>