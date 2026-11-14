const { Router } = require('express');
const { check } = require('express-validator');
const { autenticar } = require('../middlewares/auth.middleware');
const {
    obtenerViajes,
    obtenerViajePorId,
    crearViaje,
    actualizarViaje,
    eliminarViaje
} = require('../controllers/viaje.controller');

const router = Router();

// todas las rutas de viajes protegidas con token JWT
router.use(autenticar);

router.get('/', obtenerViajes);
router.get('/:id', obtenerViajePorId);

router.post('/', [
    check('vehiculo_id', 'el id del vehiculo debe ser numerico').isInt(),
    check('conductor_id', 'el id del conductor debe ser numerico').isInt(),
    check('fecha_salida', 'la fecha de salida debe ser valida (AAAA-MM-DD HH:MM:SS)').isISO8601(),
    check('fecha_llegada', 'la fecha de llegada debe ser valida (AAAA-MM-DD HH:MM:SS)').isISO8601(),
    check('origen', 'el origen es obligatorio').not().isEmpty(),
    check('destino', 'el destino es obligatorio').not().isEmpty(),
    check('kilometros', 'los kilometros deben ser un numero mayor a 0').isFloat({ min: 0.1 })
], crearViaje);

router.put('/:id', [
    check('vehiculo_id', 'el id del vehiculo debe ser numerico').isInt(),
    check('conductor_id', 'el id del conductor debe ser numerico').isInt(),
    check('fecha_salida', 'la fecha de salida debe ser valida (AAAA-MM-DD HH:MM:SS)').isISO8601(),
    check('fecha_llegada', 'la fecha de llegada debe ser valida (AAAA-MM-DD HH:MM:SS)').isISO8601(),
    check('origen', 'el origen es obligatorio').not().isEmpty(),
    check('destino', 'el destino es obligatorio').not().isEmpty(),
    check('kilometros', 'los kilometros deben ser un numero mayor a 0').isFloat({ min: 0.1 })
], actualizarViaje);

router.delete('/:id', eliminarViaje);

module.exports = router;