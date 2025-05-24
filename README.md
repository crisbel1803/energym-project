# 🚀 Energym: Sistema de Gestión de Clases
Energym es una aplicación web diseñada para optimizar la administración de un gimnasio o centro de fitness. Ofrece funcionalidades tanto para usuarios como para administradores, facilitando desde la navegación de disciplinas hasta la gestión de pagos con PayPal.

## ✨ Características Principales
### Para Usuarios 🤸:
Registro y Login: Autenticación segura.
Exploración: Navega por disciplinas y eventos disponibles.
Reservas: ¡Reserva tu lugar en clases y eventos!
Pagos: Integración con PayPal para pagos seguros en línea.
Historial: Consulta tus reservas pasadas y su estado de pago.
Contacto: Envía consultas a la administración del gimnasio.
### Para Administradores ⚙️:
Gestión Total: Administra usuarios, disciplinas, instructores, salas, eventos y pagos.
Eventos y Clases: Crea, actualiza y elimina eventos en el calendario.
Pagos: Supervisa todas las reservas y confirma pagos manuales.
Seguimiento: Monitorea el estado de todos los pagos, sin importar el método.

## 🛠️ Tecnologías Utilizadas
Backend (Servidor) 💻:
Node.js y Express.js: Entorno y framework para la aplicación.
MongoDB y Mongoose: Base de datos NoSQL y su ORM.
Multer: Para la carga de archivos (imágenes).
Nodemailer: Envío de correos electrónicos.
Axios: Cliente HTTP para la API de PayPal.
dotenv, cors, cookie-parser, morgan: Gestión de variables de entorno, CORS, cookies y registro de peticiones.
PayPal REST API: Para los pagos en línea.
Frontend (Interfaz de Usuario) 🌐:
HTML5/CSS3 y JavaScript: Para la estructura, estilos y lógica interactiva.
Axios: Para comunicarse con el API del backend.
FullCalendar.js: Para la visualización interactiva de calendarios de eventos.
Tailwind CSS: Para un estilizado rápido y eficiente.

## 🚦 API Endpoints
El backend ofrece un API RESTful completo para gestionar el gimnasio, incluyendo:

* Usuarios: POST /api/users/ (registro), POST /api/users/login (login), GET /api/users/lista-users (admin) y más.
* Disciplinas: POST /api/disciplinas/ (crear), GET /api/disciplinas/lista-disciplinas (listar) y gestión de imágenes.
* Instructores: POST /api/instructores/ (crear), GET /api/instructores/lista-instructores (listar).
* Salas: POST /api/salones/ (crear), GET /api/salones/lista-salones (listar).
* Eventos: POST /api/eventos/ (crear), GET /api/eventos/lista-eventos (listar).
* Reservas y Pagos (PayPal):

POST /api/reservas/crear-orden-paypal: Crea una orden de PayPal.

POST /api/reservas/capturar-pago-paypal: Captura pagos de PayPal.

POST /api/reservas/: Crea una reserva.

GET /api/reservas/lista-reservas?id_user=<userId>: Reservas de un usuario.

GET /api/reservas/lista-all-reservas: Todas las reservas (admin).

POST /api/reservas/registrar-pago: Registra pagos manuales.

GET /api/reservas/reservas-pagadas: Reservas pagadas (admin).

POST /api/reservas/confirmar-pago: Confirma pagos pendientes (admin).

## 🖥️ Interfaz Frontend
La aplicación sirve archivos estáticos para la interfaz de usuario:
* Rutas Frontend: /, /login, /registro, /contacto, /reservar, /panel-usuario, /panel-administrador, /bienvenida, /ver-clases.
* Archivos JavaScript Cliente:

calendario.js: Gestiona el calendario de eventos (FullCalendar.js).

pagos.js: Muestra reservas pagadas y permite a los administradores confirmar pagos.

## 📂 Estructura de Archivos (Backend)
* app.js: Archivo principal de Express.js.
* controllers/: Contiene la lógica para cada recurso (ej. usuarios.js, disciplinas.js, eventos.js, reservas.js).
* models/: Definiciones de esquemas de Mongoose para MongoDB.
* public/: Archivos estáticos accesibles públicamente, incluyendo public/data/uploads/ para imágenes subidas.
* views/: Páginas HTML y assets (css/, img/, components/).

  ### Versión ANTEPROYECTO: b686463c332493ab333b6534245fffa24e8a514f

## Visualiza la app online: [http](https://energym-project.onrender.com/)

## 📧 Contacto
Crisbel Cedeño 
+58 4120114441 
crisbelgarcia2005@gmail.com
