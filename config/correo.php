<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

function enviarCorreoSOS($latitud, $longitud, $mensaje, $correos)
{
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        $mail->Username = 'urjesus749@gmail.com';

        // PON AQUÍ TU CONTRASEÑA DE APLICACIÓN
        $mail->Password = 'Tqygfbjrpietuniow';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('urjesus749@gmail.com', 'safe-walk');

        foreach ($correos as $correo) {
            $mail->addAddress($correo);
        }

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

        // MOSTRAR EL ERROR REAL
        return "ERROR PHPMailer: " . $mail->ErrorInfo;
    }
}
?>