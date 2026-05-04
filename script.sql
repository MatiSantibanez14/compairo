-- =====================================
-- Proyecto: Compairo
-- Base de Datos: MySQL
-- Autor: Matías Santibañez
-- =====================================

-- Crear base de datos
CREATE DATABASE compairo;
USE compairo;

-- ======================
-- TABLA ROL
-- ======================
CREATE TABLE Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- ======================
-- TABLA USUARIO
-- ======================
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

-- ======================
-- TABLA CATEGORIA
-- ======================
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ======================
-- TABLA PRODUCTO
-- ======================
CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

-- ======================
-- TABLA SUPERMERCADO
-- ======================
CREATE TABLE Supermercado (
    id_supermercado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    comuna VARCHAR(100) NOT NULL
);

-- ======================
-- TABLA PRECIO
-- ======================
CREATE TABLE Precio (
    id_precio INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_supermercado INT,
    precio DECIMAL(10,2) NOT NULL,
    fecha_actualizacion DATE NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_supermercado) REFERENCES Supermercado(id_supermercado)
);

-- ======================
-- TABLA LISTA COMPRA
-- ======================
CREATE TABLE ListaCompra (
    id_lista INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre_lista VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- ======================
-- TABLA DETALLE LISTA
-- ======================
CREATE TABLE DetalleLista (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_lista INT,
    id_producto INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_lista) REFERENCES ListaCompra(id_lista),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);