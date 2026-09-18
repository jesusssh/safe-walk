<?php

session_start();

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../config/correo.php';

header('Content-Type: application/json; charset=UTF-8');


// Verificar usuario
if (!isset($_SESSION['id_usuario'])) {

    echo json_encode([
        'success' => false,
        'message' => 'Usuario no autenticado'
    ]);

    exit;
}


$id_usuario = $_SESSION['id_usuario'];


// Conectar a la base de datos
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
        'message' => 'Error al conectar con la base de datos',
        'error' => $e->getMessage()
    ]);

    exit;
}


// Recibir datos
$data = json_decode(
    file_get_contents("php://input"),
    true
);

$latitud = $data['latitud'] ?? null;
$longitud = $data['longitud'] ?? null;
$mensaje = $data['mensaje'] ?? 'Necesito ayuda';

$correo1 = $data['correo1'] ?? '';
$correo2 = $data['correo2'] ?? '';

file_put_contents(
    __DIR__ . '/debug_sos.txt',
    "Correo 1: " . $correo1 . PHP_EOL .
    "Correo 2: " . $correo2 . PHP_EOL .
    "Fecha: " . date('Y-m-d H:i:s') . PHP_EOL
);


// Verificar ubicación
if ($latitud === null || $longitud === null) {

    echo json_encode([
        'success' => false,
        'message' => 'No se recibió la ubicación'
    ]);

    exit;
}


// Obtener correos
$correos = [];


// Correo 1
if (!empty($correo1) && filter_var($correo1, FILTER_VALIDATE_EMAIL)) {

    $correos[] = $correo1;

}


// Correo 2
if (!empty($correo2) && filter_var($correo2, FILTER_VALIDATE_EMAIL)) {

    $correos[] = $correo2;

}


// Eliminar repetidos
$correos = array_unique($correos);


// Verificar correos
if (count($correos) === 0) {

    echo json_encode([
        'success' => false,
        'message' => 'No hay correos de emergencia válidos'
    ]);

    exit;
}


// Guardar SOS y enviar correo
try {

    // Guardar alerta
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


    // Enviar correo
    $resultadoCorreo = enviarCorreoSOS(
        $latitud,
        $longitud,
        $mensaje,
        $correos
    );


    // Si el correo se envió correctamente
    if ($resultadoCorreo === true) {

        echo json_encode([

            'success' => true,
            'correo' => true,
            'message' => '🚨 SOS enviado correctamente'

        ]);

        exit;
    }


    // Si el correo falló
    echo json_encode([

        'success' => false,
        'correo' => false,
        'message' => 'La alerta se guardó, pero no se pudo enviar el correo.',
        'error_correo' => $resultadoCorreo

    ]);

    exit;


} catch (PDOException $e) {

    echo json_encode([

        'success' => false,
        'message' => 'Error en la base de datos',
        'error' => $e->getMessage()

    ]);

    exit;
}

?>