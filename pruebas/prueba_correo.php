<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'urjesus749@gmail.com';

    // PON TU CONTRASEÑA DE APLICACIÓN AQUÍ
    $mail->Password = 'qygfbjrpietuniow';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('urjesus749@gmail.com', 'SafeWalk');

    // AQUÍ PON UN CORREO TUYO PARA HACER LA PRUEBA
    $mail->addAddress('katherine.romero.cdm@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Prueba SafeWalk';

    $mail->Body = '
        <h2>Prueba de correo SafeWalk</h2>
        <p>Si recibes este correo, PHPMailer está funcionando correctamente.</p>
    ';

    $mail->send();

    echo "✅ CORREO ENVIADO CORRECTAMENTE";

} catch (Exception $e) {

    echo "❌ ERROR: " . $mail->ErrorInfo;
}
?>