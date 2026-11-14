
const pool = require('../config/db');

const Usuario = {
    // crear usuario nuevo
    crear: async (nombre, email, contraseniaHasheada) => {
        const [result] = await pool.execute(
            'INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)',
            [nombre, email, contraseniaHasheada]
        );
        return result;
    },
    
    // buscar por email para login o evitar duplicados
    buscarPorEmail: async (email) => {
        const [rows] = await pool.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return rows[0]; 
    },

    // buscar por id para validar el token
    buscarPorId: async (id) => {
        const [rows] = await pool.execute(
            'SELECT id, nombre, email FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0];
    }
};

module.exports = Usuario;