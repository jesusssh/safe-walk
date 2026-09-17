<?php

session_start();

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../config/correo.php';

header('Content-Type: application/json; charset=UTF-8');

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Usuario no autenticado'
    ]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

// Obtener conexión a la base de datos
try {
    $database = new Database();
    $pdo = $database->getConnection();

    if (!$pdo) {
        echo json_encode([
            'success' => false,
            'message' => 'No se pudo conectar a la base de datos'
        ]);
        exit;
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al conectar con la base de datos'
    ]);
    exit;
}

// Recibir datos enviados desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

$latitud = $data['latitud'] ?? null;
$longitud = $data['longitud'] ?? null;
$mensaje = $data['mensaje'] ?? 'Necesito ayuda';

// Verificar ubicación
if ($latitud === null || $longitud === null) {
    echo json_encode([
        'success' => false,
        'message' => 'No se recibió la ubicación'
    ]);
    exit;
}

try {

    // Guardar alerta SOS en la base de datos
    $sql = "INSERT INTO alert_sos
            (id_usuario, latitud, longitud, mensaje)
            VALUES
            (:id_usuario, :latitud, :longitud, :mensaje)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':id_usuario' => $id_usuario,
        ':latitud' => $latitud,
        ':longitud' => $longitud,
        ':mensaje' => $mensaje
    ]);

    // Enviar correo con la ubicación
    $correoEnviado = enviarCorreoSOS(
        $latitud,
        $longitud,
        $mensaje
    );

    echo json_encode([
        'success' => true,
        'correo' => $correoEnviado,
        'message' => 'Alerta SOS enviada correctamente'
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos',
        'error' => $e->getMessage()
    ]);
}
?>