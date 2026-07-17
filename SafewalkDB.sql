CREATE DATABASE IF NOT EXISTS safewalk;

USE safewalk; 

CREATE TABLE IF NOT EXISTS usuarios(
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
correo VARCHAR(150) NOT NULL UNIQUE,
usuario VARCHAR(50) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
telefono VARCHAR(20) NULL,
foto_perfil_url VARCHAR(255),
fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
estado ENUM('activo','suspendido') DEFAULT 'activo'

);

CREATE TABLE IF NOT EXISTS contactos(
id_contacto INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
nombre_contacto VARCHAR(100) NOT NULL,
telefono_contacto VARCHAR(20) NOT NULL,
correo VARCHAR(150) NOT NULL,
parentesco VARCHAR(50) NULL,

FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS reportes(

id_reporte INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_tipo_riesgo INT NOT NULL,
titulo VARCHAR(150) NOT NULL,
descripcion TEXT NOT NULL,
imagen_url VARCHAR(255),

latitud DECIMAL(10,8) NOT NULL,
longitud DECIMAL(11,8) NOT NULL,

estado_reporte ENUM(
 'activo',
 'vencido',
 'eliminado'
 ) DEFAULT 'activo',
votos_positivos INT DEFAULT 0,
votos_negativos INT DEFAULT 0,

fecha_reporte DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
fecha_expiracion DATETIME NULL,


FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario)

); 

CREATE TABLE IF NOT EXISTS votos_reportes(
id_voto INT AUTO_INCREMENT PRIMARY KEY,
id_reporte INT NOT NULL,
id_usuario INT NOT NULL,

tipo_voto ENUM(
 'confirmar',
 'falso'
 ) NOT NULL,

fecha_voto DATETIME DEFAULT CURRENT_TIMESTAMP,
UNIQUE(id_reporte,id_usuario),

FOREIGN KEY (id_reporte) 
REFERENCES 	reportes (id_reporte),
FOREIGN KEY (id_usuario) 
REFERENCES usuarios(id_usuario)

);





CREATE TABLE IF NOT EXISTS alert_sos(

id_sos INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,

latitud DECIMAL(10,8) NOT NULL,
longitud DECIMAL(11,8) NOT NULL,

mensaje VARCHAR(255) NULL,

fecha_alerta DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS tipos_riesgo(
id_tipo_riesgo INT AUTO_INCREMENT PRIMARY KEY,
nombre_tipo VARCHAR(50) NOT NULL UNIQUE,
descripcion VARCHAR(255) NULL
);




