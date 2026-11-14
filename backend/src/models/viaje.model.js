const pool = require('../config/db');

const Viaje = {
    // traer todos los viajes con datos del vehiculo y conductor
    obtenerTodos: async () => {
        const [rows] = await pool.execute(`
            SELECT 
                v.*,
                veh.marca AS vehiculo_marca,
                veh.modelo AS vehiculo_modelo,
                veh.patente AS vehiculo_patente,
                c.nombre AS conductor_nombre,
                c.apellido AS conductor_apellido
            FROM viajes v
            INNER JOIN vehiculos veh ON v.vehiculo_id = veh.id
            INNER JOIN conductores c ON v.conductor_id = c.id
            ORDER BY v.fecha_salida DESC
        `);
        return rows;
    },

    // traer un viaje por id con sus relaciones
    obtenerPorId: async (id) => {
        const [rows] = await pool.execute(`
            SELECT 
                v.*,
                veh.marca AS vehiculo_marca,
                veh.modelo AS vehiculo_modelo,
                veh.patente AS vehiculo_patente,
                c.nombre AS conductor_nombre,
                c.apellido AS conductor_apellido
            FROM viajes v
            INNER JOIN vehiculos veh ON v.vehiculo_id = veh.id
            INNER JOIN conductores c ON v.conductor_id = c.id
            WHERE v.id = ?
        `, [id]);
        return rows[0];
    },

    // crear un viaje nuevo
    crear: async (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) => {
        const [result] = await pool.execute(
            'INSERT INTO viajes (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones || null]
        );
        return result;
    },

    // actualizar un viaje existente
    actualizar: async (id, vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) => {
        const [result] = await pool.execute(
            'UPDATE viajes SET vehiculo_id = ?, conductor_id = ?, fecha_salida = ?, fecha_llegada = ?, origen = ?, destino = ?, kilometros = ?, observaciones = ? WHERE id = ?',
            [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones || null, id]
        );
        return result;
    },

    // eliminar un viaje
    eliminar: async (id) => {
        const [result] = await pool.execute('DELETE FROM viajes WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Viaje;