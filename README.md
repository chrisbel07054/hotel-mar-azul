# Actividad Hotel

## Estudiantes
- **Alumna 1:** Luisiana Valeria Carreño Viloria
- **CI:** 31.728.880
- **Alumna 2:** Chrisbel Alexandra Briceño Briceño
- **CI:** 31.665.592
- **Materia:** Front End II
- **Profesor:** Yerson González

## Descripción
Esta actividad es una landing page sobre un hotel desarrollada en Node.js con Mongo, utilizando React como framework para la interfaz de usuario. La actividad crea reservas en el hotel y la opcion de suscribirse al blog recibiendo asi correos de notificacion, además de un sistema de autenticación para proteger las rutas mediante roles (admin y user) con tokens JWT.

## Instalación
1. Clonar el repositorio.
2. Abrir dos consolas, una para el cliente y otra para el servidor.
3. Ejecutar `npm install` en ambas consolas para instalar las dependencias.
4. Configurar un archivo `.env` en la raíz del servidor (backend) para definir variables de entorno (detalladas más adelante).
6. Iniciar ambos servidores con `npm run dev`.

## Configuración de Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
DB_NAME=hotel_mar_azul
JWT_SECRET=mySecret_1hy2gy3
PORT=8080
MONGO_URI=mongodb+srv://Chrisbel:FC6tKuL0fR61QXC1@hotelmarazul.evm80.mongodb.net/
EMAIL_USER=carrenovilorialv@uvm.edu.ve
EMAIL_PASS=rfmmulfcrvacswrn
KEY_OPENWEATHERMAP=83fb232d4fab27a113e5e97e8b35f0c9
```

## Funcionalidades

### Interfaces
- **Landing**: Promociones y servicios que motiven a los visitantes a realizar reservas o suscribirse a las ofertas exclusivas.
- **Home**: Se encuentra el clima del sitio, menu de navegacion y enlace a testimonios.
- **About**: Informacion e historia del hotel.
- **Admin**: Visualización de las estadisticas del hotel.
- **Booking**: Interfaz para ver las reservas del usuario, habitaciones y formulario de reservacion.
- **Contact**: Interfaz con formulario de contacto.
- **Login**: Interfaz de inicio de sesion.
- **Register**: Interfaz de registro.
- **Testimonials**: Interfaz de testimonios y opcion de crear al estar logeado (solo rol 'user').


### Autenticación y Autorización
- **Registro y Login**: Formulario de registro y login, con encriptación de contraseñas utilizando `bcryptjs`.
- **Roles de Usuario**: Se definen dos roles: **admin** (acceso completo al sistema) y **user** (acceso limitado).
- **Token JWT**: Al iniciar sesión, se genera un token JWT para el usuario, el cual se almacena en la sesión y se usa para autenticar las solicitudes posteriores.
- **Rutas Protegidas**: Rutas privadas (dashboard, booking) que requieren autenticación, y rutas públicas.

## Tecnologías
- **Node.js**: Servidor y lógica de backend.
- **Express**: Framework de backend para manejo de rutas y controladores.
- **Mongodb**: Base de datos para almacenar los datos.
- **React**: Framework para la interfaz de usuario.
- **bcryptjs**: Encriptación de contraseñas.
- **jsonwebtoken**: Generación y verificación de tokens JWT.
- **dotenv**: Gestión de variables de entorno.
- **framer-motion**: Animaciones agradables al visitar las interfaces.
- **tailwindcss**: Estilos.
- **react-hot-toast**: Notificaciones para procesos de exito/error.
- **zod**: Validacion robusta de formularios.
- **react-router-dom**: Para naevegar entre paginas publicas y privadas.
- **nodemailer**: Envio de correos.
- **axios**: Solicitudes asincronas.

## Instrucciones de Uso
1. **Landing Page**: Acceder a `http://localhost:5173` para visitar la Landing Page.
1. **Inicio de Sesión**: Acceder a `http://localhost:5173/login` para iniciar sesión.
2. **Credenciales de admin**: Autenticate con 'admin@test.com' y clave '123456'.
3. **Roles y Permisos**:
   - **Admin**: Acceso completo a la administración del sistema.
   - **User**: Acceso limitado.

## Explicación Técnica

### Autenticación con JWT
- En el inicio de sesión, se genera un token JWT que contiene la información del usuario y su rol. Este token se almacena en la sesión para autenticar las solicitudes posteriores.
- Las rutas protegidas verifican la validez del token y los permisos según el rol del usuario.

### Encriptación de Contraseñas
- Las contraseñas se encriptan utilizando `bcryptjs` al momento del registro. 
- Durante el login, la contraseña ingresada se compara con la encriptada en la base de datos para garantizar seguridad en la autenticación.
