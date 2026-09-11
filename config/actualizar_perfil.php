<?php
session_start();
header('Content-Type: application/json');

require_once '../config/conexion.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = $_SESSION['id_usuario'];
$nombre     = $conexion->real_escape_string($data['nombre']);
$apellido   = $conexion->real_escape_string($data['apellido']);
$telefono   = $conexion->real_escape_string($data['telefono']);

$stmt = $conexion->prepare("UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ? WHERE id_usuario = ?");
$stmt->bind_param("sssi", $nombre, $apellido, $telefono, $id_usuario);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Perfil actualizado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el perfil']);
}

$stmt->close();
$conexion->close();
?>