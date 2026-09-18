<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

function enviarCorreoSOS($latitud, $longitud, $mensaje)
{
    $mail = new PHPMailer(true);

    try {

        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'TU_CORREO@gmail.com';
        $mail->Password   = 'TU_CONTRASEÑA_DE_APLICACION';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remitente
        $mail->setFrom('TU_CORREO@gmail.com', 'SafeWalk');

        // Correo que recibirá la alerta
        $mail->addAddress('CORREO_DEL_CONTACTO@gmail.com');

        // Convertir coordenadas en enlace de Google Maps
        $mapa = "https://www.google.com/maps?q=$latitud,$longitud";

        $mail->isHTML(true);
        $mail->Subject = '🚨 ALERTA SOS - SafeWalk';

        $mail->Body = "
            <h2>🚨 Alerta SOS</h2>

            <p>Se ha enviado una alerta de emergencia desde SafeWalk.</p>

            <p><strong>Mensaje:</strong> $mensaje</p>

            <p><strong>Latitud:</strong> $latitud</p>
            <p><strong>Longitud:</strong> $longitud</p>

            <p>
                <a href='$mapa'>
                    📍 VER UBICACIÓN EN GOOGLE MAPS
                </a>
            </p>
        ";

        $mail->send();

        return true;

    } catch (Exception $e) {

        return false;
    }
}