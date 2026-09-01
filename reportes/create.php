<?php

header("Content-Type: application/json; charset=UTF-8");

session_start();

require_once("../config/conexion.php");

try {

    // Verificar sesión
    if (!isset($_SESSION["id_usuario"])) {

        echo json_encode([
            "success" => false,
            "message" => "Debes iniciar sesión para crear un reporte."
        ]);

        exit;
    }

    // Crear conexión
    $database = new Database();
    $db = $database->getConnection();

    // Obtener usuario de la sesión
    $id_usuario = $_SESSION["id_usuario"];

    // Obtener JSON enviado por Fetch
    $datos = json_decode(file_get_contents("php://input"), true);

    if (!$datos) {

        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos."
        ]);

        exit;
    }

    // =========================
    // OBTENER DATOS
    // =========================

    $id_tipo_riesgo = $datos["id_tipo_riesgo"] ?? null;
    $descripcion = trim($datos["descripcion"] ?? "");
    $latitud = $datos["latitud"] ?? null;
    $longitud = $datos["longitud"] ?? null;
    $imagen = $datos["imagen"] ?? null;

    // =========================
    // VALIDACIONES
    // =========================

    if (empty($id_tipo_riesgo)) {

        echo json_encode([
            "success" => false,
            "message" => "Debes seleccionar un tipo de incidente."
        ]);

        exit;
    }

    if ($descripcion === "") {

        echo json_encode([
            "success" => false,
            "message" => "La descripción es obligatoria."
        ]);

        exit;
    }

    if (strlen($descripcion) > 200) {

        echo json_encode([
            "success" => false,
            "message" => "La descripción no puede superar los 200 caracteres."
        ]);

        exit;
    }

    if ($latitud === null || $longitud === null || $latitud === "" || $longitud === "") {

        echo json_encode([
            "success" => false,
            "message" => "Debes seleccionar una ubicación en el mapa."
        ]);

        exit;
    }

    if (!is_numeric($latitud) || !is_numeric($longitud)) {

        echo json_encode([
            "success" => false,
            "message" => "La ubicación no es válida."
        ]);

        exit;
    }

    // =========================
    // COMPROBAR TIPO DE RIESGO
    // =========================

    $sqlTipo = "SELECT id_tipo_riesgo, nombre
                FROM tipos_riesgo
                WHERE id_tipo_riesgo = :id_tipo_riesgo";

    $stmtTipo = $db->prepare($sqlTipo);

    $stmtTipo->execute([
        ":id_tipo_riesgo" => $id_tipo_riesgo
    ]);

    $tipo = $stmtTipo->fetch(PDO::FETCH_ASSOC);

    if (!$tipo) {

        echo json_encode([
            "success" => false,
            "message" => "El tipo de incidente seleccionado no existe."
        ]);

        exit;
    }

    // El título será automáticamente el nombre del tipo
    $titulo = $tipo["nombre"];

    // =========================
    // GUARDAR IMAGEN
    // =========================

    $imagen_url = null;

    if (!empty($imagen)) {

        // Comprobar que tenga formato Base64
        if (strpos($imagen, "data:image/") !== 0) {

            echo json_encode([
                "success" => false,
                "message" => "El formato de la imagen no es válido."
            ]);

            exit;
        }

        // Obtener información de la imagen
        $partes = explode(",", $imagen, 2);

        if (count($partes) !== 2) {

            echo json_encode([
                "success" => false,
                "message" => "La imagen enviada no es válida."
            ]);

            exit;
        }

        $datosImagen = base64_decode($partes[1], true);

        if ($datosImagen === false) {

            echo json_encode([
                "success" => false,
                "message" => "No se pudo procesar la imagen."
            ]);

            exit;
        }

        // Crear nombre único
        $nombreImagen = "reporte_" . uniqid() . ".jpg";

        // Ruta física
        $carpetaImagenes = "../public/img/reportes/";

        // Crear carpeta si no existe
        if (!is_dir($carpetaImagenes)) {

            if (!mkdir($carpetaImagenes, 0777, true)) {

                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo crear la carpeta de imágenes."
                ]);

                exit;
            }
        }

        $rutaImagen = $carpetaImagenes . $nombreImagen;

        // Guardar imagen
        if (file_put_contents($rutaImagen, $datosImagen) === false) {

            echo json_encode([
                "success" => false,
                "message" => "No se pudo guardar la imagen."
            ]);

            exit;
        }

        // Ruta que se almacenará en MySQL
        $imagen_url = "img/reportes/" . $nombreImagen;
    }

    // =========================
    // INSERTAR REPORTE
    // =========================

    $sql = "INSERT INTO reportes (
                id_usuario,
                id_tipo_riesgo,
                titulo,
                descripcion,
                imagen_url,
                latitud,
                longitud
            )
            VALUES (
                :id_usuario,
                :id_tipo_riesgo,
                :titulo,
                :descripcion,
                :imagen_url,
                :latitud,
                :longitud
            )";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":id_usuario" => $id_usuario,
        ":id_tipo_riesgo" => $id_tipo_riesgo,
        ":titulo" => $titulo,
        ":descripcion" => $descripcion,
        ":imagen_url" => $imagen_url,
        ":latitud" => $latitud,
        ":longitud" => $longitud
    ]);

    // =========================
    // RESPUESTA
    // =========================

    echo json_encode([
        "success" => true,
        "message" => "Reporte enviado correctamente.",
        "id_reporte" => $db->lastInsertId()
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Error de base de datos.",
        "error" => $e->getMessage()
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "Ocurrió un error.",
        "error" => $e->getMessage()
    ]);
}
?>
