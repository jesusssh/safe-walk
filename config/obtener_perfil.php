<?php
session_start();
header('Content-Type: application/json');

// Incluir la clase de conexión
require_once 'conexion.php';

// Verificar sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

try {
    // Instanciar la base de datos y obtener la conexión PDO
    $database = new Database();
    $conexion = $database->getConnection();

    // Preparar la consulta usando PDO
    $stmt = $conexion->prepare("SELECT id_usuario, nombre, apellido, correo, usuario, telefono, foto_perfil_url FROM usuarios WHERE id_usuario = ?");
    
    // Ejecutar pasando el parámetro en un arreglo
    $stmt->execute([$id_usuario]);
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode(['success' => true, 'data' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>