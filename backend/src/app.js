// src/app.js
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares basicos
app.use(cors());
app.use(express.json()); 

// inicializacion de passport
app.use(passport.initialize());
require('./config/passport')(passport);

// RUTAS
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// ruta de prueba 
app.get('/api/ping', (req, res) => {
    res.json({ mensaje: 'backend del tp3 funcionando de diez' });
});

// inicializacion del servidor
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});