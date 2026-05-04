Compairo

Descripción:
Compairo es una aplicación web que permite comparar el costo total de una lista de compra entre distintos supermercados, con el objetivo de ayudar al usuario a tomar decisiones más económicas.

Funcionalidades:
- Registro e inicio de sesión de usuarios
- Creación de listas de compra
- Agregar productos a una lista
- Comparación de precios entre supermercados
- Visualización del supermercado más económico

Tecnologías utilizadas:
- Base de datos: MySQL
- Backend: Node.js con Express
- Frontend: Angular (planificado)

Base de datos:
El sistema está compuesto por las siguientes tablas:
Usuario, Rol, ListaCompra, DetalleLista, Producto, Categoria, Supermercado y Precio.

Estas tablas permiten almacenar la información de usuarios, productos, supermercados y los precios necesarios para realizar la comparación.

Cómo ejecutar la base de datos:
1. Abrir MySQL Workbench
2. Ejecutar el archivo script.sql para crear las tablas
3. Ejecutar el archivo datos.sql para insertar datos de prueba

Ejemplo de consulta:
SELECT s.nombre, SUM(p.precio * d.cantidad) AS total
FROM DetalleLista d
JOIN Precio p ON d.id_producto = p.id_producto
JOIN Supermercado s ON p.id_supermercado = s.id_supermercado
WHERE d.id_lista = 1
GROUP BY s.nombre;

Autor:
Carlos Santibañez