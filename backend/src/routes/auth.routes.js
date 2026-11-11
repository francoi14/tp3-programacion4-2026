// src/routes/auth.routes.js
const { Router } = require('express');
const { check } = require('express-validator');
const { registrar, login } = require('../controllers/auth.controller');

const router = Router();

// ruta para registrar un usuario nuevo
router.post('/registro', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'tiene que ser un email valido').isEmail(),
    check('contrasenia', 'la clave tiene que tener al menos 6 caracteres').isLength({ min: 6 })
], registrar);

// ruta para loguearse
router.post('/login', [
    check('email', 'tiene que ser un email valido').isEmail(),
    check('contrasenia', 'la clave es obligatoria').not().isEmpty()
], login);

module.exports = router;