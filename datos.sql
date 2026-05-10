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
('Bebidas'),
('Limpieza'),
('Carnes'),
('Snacks');

-- ======================
-- PRODUCTO
-- ======================
INSERT INTO Producto (nombre, id_categoria) VALUES
('Leche', 1),
('Arroz', 2),
('Bebida isotónica', 3);
('Yogurt', 1),
('Queso', 1),
('Fideos', 2),
('Azúcar', 2),
('Aceite', 2),
('Coca-Cola', 3),
('Jugo de naranja', 3),
('Detergente', 4),
('Papel higiénico', 4),
('Lavalozas', 4),
('Pollo', 5),
('Carne molida', 5),
('Papas fritas', 6),
('Galletas', 6);

-- ======================
-- SUPERMERCADO
-- ======================
INSERT INTO Supermercado (nombre, region, comuna) VALUES
('Lider', 'Metropolitana', 'San Bernardo'),
('Jumbo', 'Metropolitana', 'La Florida'),
('Tottus', 'Metropolitana', 'Puente Alto');

('Lider', 'Metropolitana', 'Maipú'),
('Lider', 'Metropolitana', 'Santiago'),
('Lider', 'Metropolitana', 'Puente Alto'),

('Jumbo', 'Metropolitana', 'Providencia'),
('Jumbo', 'Metropolitana', 'Ñuñoa'),
('Jumbo', 'Metropolitana', 'Las Condes'),

('Tottus', 'Metropolitana', 'San Miguel'),
('Tottus', 'Metropolitana', 'Estación Central'),
('Tottus', 'Metropolitana', 'Maipú');

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

(4, 1, 2500, '2026-04-15'),
(4, 2, 2200, '2026-04-15'),
(4, 3, 2400, '2026-04-15'),

(5, 1, 4200, '2026-04-15'),
(5, 2, 3900, '2026-04-15'),
(5, 3, 4100, '2026-04-15'),

(6, 1, 900, '2026-04-15'),
(6, 2, 1100, '2026-04-15'),
(6, 3, 1000, '2026-04-15'),

(7, 1, 1300, '2026-04-15'),
(7, 2, 1500, '2026-04-15'),
(7, 3, 1400, '2026-04-15'),

(8, 1, 3200, '2026-04-15'),
(8, 2, 3500, '2026-04-15'),
(8, 3, 3400, '2026-04-15'),

(9, 1, 2800, '2026-04-15'),
(9, 2, 2900, '2026-04-15'),
(9, 3, 2500, '2026-04-15'),

(10, 1, 1800, '2026-04-15'),
(10, 2, 1900, '2026-04-15'),
(10, 3, 1600, '2026-04-15'),

(11, 1, 4500, '2026-04-15'),
(11, 2, 5200, '2026-04-15'),
(11, 3, 4900, '2026-04-15'),

(12, 1, 3900, '2026-04-15'),
(12, 2, 4300, '2026-04-15'),
(12, 3, 4100, '2026-04-15'),

(13, 1, 1700, '2026-04-15'),
(13, 2, 2000, '2026-04-15'),
(13, 3, 1800, '2026-04-15'),

(14, 1, 6200, '2026-04-15'),
(14, 2, 5600, '2026-04-15'),
(14, 3, 6500, '2026-04-15'),

(15, 1, 7800, '2026-04-15'),
(15, 2, 7200, '2026-04-15'),
(15, 3, 7900, '2026-04-15'),

(16, 1, 2200, '2026-04-15'),
(16, 2, 2400, '2026-04-15'),
(16, 3, 1900, '2026-04-15'),

(17, 1, 1800, '2026-04-15'),
(17, 2, 1900, '2026-04-15'),
(17, 3, 1600, '2026-04-15');

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