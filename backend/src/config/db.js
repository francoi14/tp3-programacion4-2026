// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// probamos la conexion al levantar
pool.getConnection()
    .then(connection => {
        console.log('conexion a la base de datos de transporte exitosa');
        connection.release();
    })
    .catch(err => {
        console.error('error conectando a la base de datos:', err.message);
    });

module.exports = pool;