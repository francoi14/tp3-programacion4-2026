const pool = require('../config/db');

const Vehiculo = {
    // traer todos los vehiculos
    obtenerTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM vehiculos');
        return rows;
    },

    // traer uno solo por id
    obtenerPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM vehiculos WHERE id = ?', [id]);
        return rows[0];
    },

    // buscar por patente para evitar duplicados
    buscarPorPatente: async (patente) => {
        const [rows] = await pool.execute('SELECT * FROM vehiculos WHERE patente = ?', [patente]);
        return rows[0];
    },

    // crear un vehiculo nuevo
    crear: async (marca, modelo, patente, anio, capacidad_carga) => {
        const [result] = await pool.execute(
            'INSERT INTO vehiculos (marca, modelo, patente, anio, capacidad_carga) VALUES (?, ?, ?, ?, ?)',
            [marca, modelo, patente, anio, capacidad_carga]
        );
        return result;
    },

    // actualizar vehiculo existente
    actualizar: async (id, marca, modelo, patente, anio, capacidad_carga) => {
        const [result] = await pool.execute(
            'UPDATE vehiculos SET marca = ?, modelo = ?, patente = ?, anio = ?, capacidad_carga = ? WHERE id = ?',
            [marca, modelo, patente, anio, capacidad_carga, id]
        );
        return result;
    },

    // eliminar un vehiculo
    eliminar: async (id) => {
        const [result] = await pool.execute('DELETE FROM vehiculos WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Vehiculo;