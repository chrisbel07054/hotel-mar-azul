const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


// Inicialización de la aplicación
const app = express();
app.use(cors());
app.use(express.json());


// Conexión a MongoDB
require('./config/database');

// Importar rutas
const userRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact_messages');
const roomRoutes = require('./routes/room');
const adminRoutes = require('./routes/dashboard');
const notificationRoutes = require('./routes/notificationRoutes');
const climaController = require('./routes/clima')


// Usar rutas
app.use('/', notificationRoutes);
app.use('/', climaController);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/testimonials', testimonialRoutes);
app.use('/blogs', blogRoutes);
app.use('/contacts', contactRoutes);
app.use('/rooms', roomRoutes);
app.use('/admin', adminRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
