const { validationResult } = require('express-validator');
const Vehiculo = require('../models/vehiculo.model');

const obtenerVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.obtenerTodos();
        res.json(vehiculos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al obtener los vehiculos' });
    }
};

const obtenerVehiculoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const vehiculo = await Vehiculo.obtenerPorId(id);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'vehiculo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al buscar el vehiculo' });
    }
};

const crearVehiculo = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { marca, modelo, patente, anio, capacidad_carga } = req.body;

    try {
        const existePatente = await Vehiculo.buscarPorPatente(patente);
        if (existePatente) {
            return res.status(400).json({ mensaje: 'la patente ya se encuentra registrada' });
        }

        const resultado = await Vehiculo.crear(marca, modelo, patente, anio, capacidad_carga);
        res.status(201).json({ 
            mensaje: 'vehiculo creado con exito',
            id: resultado.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al guardar el vehiculo' });
    }
};

const actualizarVehiculo = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.params;
    const { marca, modelo, patente, anio, capacidad_carga } = req.body;

    try {
        const vehiculo = await Vehiculo.obtenerPorId(id);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'vehiculo no encontrado para actualizar' });
        }

        await Vehiculo.actualizar(id, marca, modelo, patente, anio, capacidad_carga);
        res.json({ mensaje: 'vehiculo actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al actualizar el vehiculo' });
    }
};

const eliminarVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
        const vehiculo = await Vehiculo.obtenerPorId(id);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'vehiculo no encontrado para eliminar' });
        }

        await Vehiculo.eliminar(id);
        res.json({ mensaje: 'vehiculo eliminado con exito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al eliminar el vehiculo' });
    }
};

module.exports = {
    obtenerVehiculos,
    obtenerVehiculoPorId,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
};