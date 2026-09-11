<?php
session_start();
header('Content-Type: application/json');

// Incluir conexión existente
require_once '../config/conexion.php';

// Verificar sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'No hay sesión iniciada']);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

$stmt = $conexion->prepare("SELECT id_usuario, nombre, apellido, correo, usuario, telefono, foto_perfil_url FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($user = $resultado->fetch_assoc()) {
    echo json_encode(['success' => true, 'data' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}

$stmt->close();
$conexion->close();
?>