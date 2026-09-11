

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NULL,
    foto_perfil_url VARCHAR(255),
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'suspendido') DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS tipos_riesgo (
    id_tipo_riesgo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

INSERT IGNORE INTO tipos_riesgo (id_tipo_riesgo, nombre) VALUES
(1, 'Robo'),
(2, 'Acoso'),
(3, 'Calle oscura'),
(4, 'Otro');

CREATE TABLE IF NOT EXISTS reportes (
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
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_tipo_riesgo)
        REFERENCES tipos_riesgo(id_tipo_riesgo)
);

SELECT * FROM tipos_riesgo;

SELECT * FROM reportes;