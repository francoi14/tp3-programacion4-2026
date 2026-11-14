
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario.model');

const registrar = async (req, res) => {
    
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, email, contrasenia } = req.body;

    try {
        
        const existeUsuario = await Usuario.buscarPorEmail(email);
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'el email ya esta registrado en el sistema' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const contraseniaHasheada = await bcrypt.hash(contrasenia, salt);

        
        await Usuario.crear(nombre, email, contraseniaHasheada);

        res.status(201).json({ mensaje: 'usuario registrado con exito, ya podes loguearte' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error interno del servidor al registrar' });
    }
};

const login = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, contrasenia } = req.body;

    try {
        
        const usuario = await Usuario.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'credenciales invalidas' }); 
        }

        
        const passwordValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'credenciales invalidas' });
        }

        
        const payload = {
            id: usuario.id,
            email: usuario.email
        };

        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.json({
            mensaje: 'login exitoso',
            token,
            usuario: { 
                id: usuario.id, 
                nombre: usuario.nombre, 
                email: usuario.email 
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error interno del servidor al loguear' });
    }
};

module.exports = { registrar, login };