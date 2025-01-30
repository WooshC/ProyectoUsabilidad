-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS accesibilidad;
USE accesibilidad;

-- Establecer la zona horaria a Ecuador (America/Guayaquil)
SET GLOBAL time_zone = 'America/Guayaquil';
SET time_zone = 'America/Guayaquil';

-- Crear la tabla para almacenar la información personal de los artistas
CREATE TABLE IF NOT EXISTS artistas (
                                        id_artista INT AUTO_INCREMENT PRIMARY KEY,
                                        nombre VARCHAR(100) NOT NULL,
                                        correo VARCHAR(100) NOT NULL UNIQUE,
                                        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla para almacenar las obras de arte
CREATE TABLE IF NOT EXISTS obras_arte (
                                          id_obra INT AUTO_INCREMENT PRIMARY KEY,
                                          id_artista INT NOT NULL,
                                          nombre_obra VARCHAR(100) NOT NULL,
                                          descripcion TEXT,
                                          fecha_creacion DATE NOT NULL,
                                          puntaje DECIMAL(5, 2) DEFAULT 0.0,
                                          records TEXT,
                                          FOREIGN KEY (id_artista) REFERENCES artistas(id_artista) ON DELETE CASCADE
);

-- Crear la tabla para almacenar los puntajes de las obras de arte
CREATE TABLE IF NOT EXISTS puntajes (
                                        id_puntaje INT AUTO_INCREMENT PRIMARY KEY,
                                        id_obra INT NOT NULL,
                                        puntaje DECIMAL(5, 2) NOT NULL,
                                        fecha_puntaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (id_obra) REFERENCES obras_arte(id_obra) ON DELETE CASCADE
);

-- Crear la tabla para almacenar los records de las obras de arte
CREATE TABLE IF NOT EXISTS records (
                                       id_record INT AUTO_INCREMENT PRIMARY KEY,
                                       id_obra INT NOT NULL,
                                       record TEXT NOT NULL,
                                       fecha_record TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       FOREIGN KEY (id_obra) REFERENCES obras_arte(id_obra) ON DELETE CASCADE
);

-- Crear la tabla para almacenar los logros obtenidos por los artistas
CREATE TABLE IF NOT EXISTS logros (
                                      id_logro INT AUTO_INCREMENT PRIMARY KEY,
                                      id_artista INT NOT NULL,
                                      titulo VARCHAR(100) NOT NULL,  -- Título del logro
                                      descripcion TEXT NOT NULL,
                                      fecha_logro DATE NOT NULL,
                                      FOREIGN KEY (id_artista) REFERENCES artistas(id_artista) ON DELETE CASCADE
);

