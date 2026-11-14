const pool = require('../config/db');

const Conductor = {
    // traer todos los conductores
    obtenerTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM conductores');
        return rows;
    },

    // buscar por id
    obtenerPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM conductores WHERE id = ?', [id]);
        return rows[0];
    },

    // validar que no se repita dni ni licencia
    buscarPorDocumentoOLicencia: async (numero_documento, numero_licencia) => {
        const [rows] = await pool.execute(
            'SELECT * FROM conductores WHERE numero_documento = ? OR numero_licencia = ?',
            [numero_documento, numero_licencia]
        );
        return rows[0];
    },

    // crear conductor nuevo
    crear: async (nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia) => {
        const [result] = await pool.execute(
            'INSERT INTO conductores (nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia]
        );
        return result;
    },

    // actualizar conductor
    actualizar: async (id, nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia) => {
        const [result] = await pool.execute(
            'UPDATE conductores SET nombre = ?, apellido = ?, numero_documento = ?, numero_licencia = ?, fecha_alta_licencia = ?, fecha_vencimiento_licencia = ? WHERE id = ?',
            [nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia, id]
        );
        return result;
    },

    // eliminar conductor
    eliminar: async (id) => {
        const [result] = await pool.execute('DELETE FROM conductores WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Conductor;