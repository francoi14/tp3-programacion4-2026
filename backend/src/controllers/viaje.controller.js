const { validationResult } = require('express-validator');
const Viaje = require('../models/viaje.model');
const Vehiculo = require('../models/vehiculo.model');
const Conductor = require('../models/conductor.model');

const obtenerViajes = async (req, res) => {
    try {
        const viajes = await Viaje.obtenerTodos();
        res.json(viajes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al obtener los viajes' });
    }
};

const obtenerViajePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const viaje = await Viaje.obtenerPorId(id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'viaje no encontrado' });
        }
        res.json(viaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al buscar el viaje' });
    }
};

const crearViaje = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones } = req.body;

    try {
        // verificamos que existan el vehiculo y el conductor antes de insertar
        const vehiculo = await Vehiculo.obtenerPorId(vehiculo_id);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'el vehiculo indicado no existe' });
        }

        const conductor = await Conductor.obtenerPorId(conductor_id);
        if (!conductor) {
            return res.status(404).json({ mensaje: 'el conductor indicado no existe' });
        }

        const resultado = await Viaje.crear(
            vehiculo_id,
            conductor_id,
            fecha_salida,
            fecha_llegada,
            origen,
            destino,
            kilometros,
            observaciones
        );

        res.status(201).json({
            mensaje: 'viaje registrado con exito',
            id: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al registrar el viaje' });
    }
};

const actualizarViaje = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.params;
    const { vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones } = req.body;

    try {
        const viaje = await Viaje.obtenerPorId(id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'viaje no encontrado para actualizar' });
        }

        const vehiculo = await Vehiculo.obtenerPorId(vehiculo_id);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'el vehiculo indicado no existe' });
        }

        const conductor = await Conductor.obtenerPorId(conductor_id);
        if (!conductor) {
            return res.status(404).json({ mensaje: 'el conductor indicado no existe' });
        }

        await Viaje.actualizar(
            id,
            vehiculo_id,
            conductor_id,
            fecha_salida,
            fecha_llegada,
            origen,
            destino,
            kilometros,
            observaciones
        );

        res.json({ mensaje: 'viaje actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al actualizar el viaje' });
    }
};

const eliminarViaje = async (req, res) => {
    const { id } = req.params;
    try {
        const viaje = await Viaje.obtenerPorId(id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'viaje no encontrado para eliminar' });
        }

        await Viaje.eliminar(id);
        res.json({ mensaje: 'viaje eliminado con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al eliminar el viaje' });
    }
};

module.exports = {
    obtenerViajes,
    obtenerViajePorId,
    crearViaje,
    actualizarViaje,
    eliminarViaje
};