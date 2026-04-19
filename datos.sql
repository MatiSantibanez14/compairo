-- =====================================
-- Datos de prueba - Compairo
-- =====================================

-- ======================
-- ROL
-- ======================

INSERT INTO Rol (nombre_rol) VALUES 
('Administrador'),
('Usuario');

-- ======================
-- USUARIO
-- ======================
INSERT INTO Usuario (nombre, correo, contrasena, id_rol) VALUES
('Carlos', 'msantibanez1997@gmail.com', '1234', 2),
('Admin', 'cmsantibanez1497@gmail.com', 'admin123', 1);

-- ======================
-- CATEGORIA
-- ======================
INSERT INTO Categoria (nombre) VALUES
('Lácteos'),
('Abarrotes'),
('Bebidas');

-- ======================
-- PRODUCTO
-- ======================
INSERT INTO Producto (nombre, id_categoria) VALUES
('Leche', 1),
('Arroz', 2),
('Bebida isotónica', 3);

-- ======================
-- SUPERMERCADO
-- ======================
INSERT INTO Supermercado (nombre, region, comuna) VALUES
('Lider', 'Metropolitana', 'San Bernardo'),
('Jumbo', 'Metropolitana', 'La Florida'),
('Tottus', 'Metropolitana', 'Puente Alto');

-- ======================
-- PRECIO
-- ======================
INSERT INTO Precio (id_producto, id_supermercado, precio, fecha_actualizacion) VALUES
(1, 1, 1100, '2026-04-15'),
(1, 2, 1350, '2026-04-15'),
(1, 3, 1150, '2026-04-15'),

(2, 1, 900, '2026-04-15'),
(2, 2, 1100, '2026-04-15'),
(2, 3, 950, '2026-04-15'),

(3, 1, 1500, '2026-04-15'),
(3, 2, 1800, '2026-04-15'),
(3, 3, 1550, '2026-04-15');

-- ======================
-- LISTA COMPRA
-- ======================
INSERT INTO ListaCompra (id_usuario, nombre_lista, fecha_creacion) VALUES
(1, 'Compra semanal', '2026-04-15');

-- ======================
-- DETALLE LISTA
-- ======================
INSERT INTO DetalleLista (id_lista, id_producto, cantidad) VALUES
(1, 1, 2),
(1, 2, 1),
(1, 3, 1);