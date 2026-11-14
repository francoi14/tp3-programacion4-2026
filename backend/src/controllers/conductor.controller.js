const { validationResult } = require('express-validator');
const Conductor = require('../models/conductor.model');

const obtenerConductores = async (req, res) => {
    try {
        const conductores = await Conductor.obtenerTodos();
        res.json(conductores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al obtener los conductores' });
    }
};

const obtenerConductorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const conductor = await Conductor.obtenerPorId(id);
        if (!conductor) {
            return res.status(404).json({ mensaje: 'conductor no encontrado' });
        }
        res.json(conductor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al buscar el conductor' });
    }
};

const crearConductor = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia } = req.body;

    try {
        const existe = await Conductor.buscarPorDocumentoOLicencia(numero_documento, numero_licencia);
        if (existe) {
            return res.status(400).json({ mensaje: 'ya existe un conductor con ese documento o numero de licencia' });
        }

        const resultado = await Conductor.crear(
            nombre, 
            apellido, 
            numero_documento, 
            numero_licencia, 
            fecha_alta_licencia, 
            fecha_vencimiento_licencia
        );

        res.status(201).json({
            mensaje: 'conductor creado con exito',
            id: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al registrar el conductor' });
    }
};

const actualizarConductor = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.params;
    const { nombre, apellido, numero_documento, numero_licencia, fecha_alta_licencia, fecha_vencimiento_licencia } = req.body;

    try {
        const conductor = await Conductor.obtenerPorId(id);
        if (!conductor) {
            return res.status(404).json({ mensaje: 'conductor no encontrado para actualizar' });
        }

        await Conductor.actualizar(
            id, 
            nombre, 
            apellido, 
            numero_documento, 
            numero_licencia, 
            fecha_alta_licencia, 
            fecha_vencimiento_licencia
        );

        res.json({ mensaje: 'conductor actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al actualizar el conductor' });
    }
};

const eliminarConductor = async (req, res) => {
    const { id } = req.params;
    try {
        const conductor = await Conductor.obtenerPorId(id);
        if (!conductor) {
            return res.status(404).json({ mensaje: 'conductor no encontrado para eliminar' });
        }

        await Conductor.eliminar(id);
        res.json({ mensaje: 'conductor eliminado con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al eliminar el conductor' });
    }
};

module.exports = {
    obtenerConductores,
    obtenerConductorPorId,
    crearConductor,
    actualizarConductor,
    eliminarConductor
};