const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const promotionRoutes = require('./routes/promotionRoutes');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reservRoutes = require('./routes/reservationRoutes');
const blogRoutes = require('./routes/blogRoutes');
// Inicializar la aplicación Express
const app = express();

// Permitir solicitudes CORS desde tu aplicación React
app.use(cors());

// Usar express.json() como middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODBURL);

// Rutas
app.use(promotionRoutes);
app.use(authRoutes);
app.use(roomRoutes);
app.use(reservRoutes);
app.use(blogRoutes);


app.listen(3001, () => console.log('Server is running on http://localhost:3001'));
