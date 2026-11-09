// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares basicos
app.use(cors());
app.use(express.json()); // para que express entienda los body en formato json

// ruta de prueba para verificar que el server responde
app.get('/api/ping', (req, res) => {
    res.json({ mensaje: 'backend del tp3 funcionando de diez' });
});

// inicializacion del servidor
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});