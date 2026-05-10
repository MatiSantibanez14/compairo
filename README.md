# 🛒 Compairo

Compairo es una aplicación web desarrollada para comparar precios de productos entre distintos supermercados, permitiendo a los usuarios crear listas de compra y visualizar la alternativa más económica según los productos seleccionados.

---

# 📌 Funcionalidades

## Usuarios
- Registro de usuarios
- Inicio y cierre de sesión
- Creación de listas de compra
- Agregar y eliminar productos
- Comparación de precios entre supermercados
- Visualización del supermercado más conveniente

## Administrador
- Creación de productos
- Gestión de supermercados
- Asignación de precios
- Administración de datos del sistema

---

# 🛠 Tecnologías utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Base de Datos
- MySQL

---

# 🗂 Estructura del proyecto

```plaintext
compairo/
│
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── index.js
│   └── datos.sql
│
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── app.js
│   ├── admin.js
│   └── style.css
│
└── README.md
```

---

# ▶️ Cómo ejecutar el proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/MatiSantibanez14/compairo.git
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crear archivo `.env` en backend:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Asdf1337.
DB_NAME=compairo
```

## 4. Importar base de datos

Ejecutar archivo:

```plaintext
datos.sql
```

en MySQL Workbench o phpMyAdmin.

## 5. Iniciar servidor backend

```bash
node index.js
```

## 6. Ejecutar frontend

Abrir `index.html` con Live Server en Visual Studio Code.

---

# 📸 Capturas

El sistema incluye:
- Registro de usuarios
- Inicio de sesión
- Gestión de listas
- Comparación de precios
- Panel administrador

---

# 👨‍💻 Autor

Matías Santibáñez

Proyecto desarrollado para la asignatura de Proyecto de Titulo.