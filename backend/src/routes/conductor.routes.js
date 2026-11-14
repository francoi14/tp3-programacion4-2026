const { Router } = require('express');
const { check } = require('express-validator');
const { autenticar } = require('../middlewares/auth.middleware');
const {
    obtenerConductores,
    obtenerConductorPorId,
    crearConductor,
    actualizarConductor,
    eliminarConductor
} = require('../controllers/conductor.controller');

const router = Router();

// todas las rutas de conductores protegidas con token JWT
router.use(autenticar);

router.get('/', obtenerConductores);
router.get('/:id', obtenerConductorPorId);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('apellido', 'el apellido es obligatorio').not().isEmpty(),
    check('numero_documento', 'el numero de documento es obligatorio').not().isEmpty(),
    check('numero_licencia', 'el numero de licencia es obligatorio').not().isEmpty(),
    check('fecha_alta_licencia', 'la fecha de alta debe ser una fecha valida (AAAA-MM-DD)').isISO8601(),
    check('fecha_vencimiento_licencia', 'la fecha de vencimiento debe ser una fecha valida (AAAA-MM-DD)').isISO8601()
], crearConductor);

router.put('/:id', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('apellido', 'el apellido es obligatorio').not().isEmpty(),
    check('numero_documento', 'el numero de documento es obligatorio').not().isEmpty(),
    check('numero_licencia', 'el numero de licencia es obligatorio').not().isEmpty(),
    check('fecha_alta_licencia', 'la fecha de alta debe ser una fecha valida (AAAA-MM-DD)').isISO8601(),
    check('fecha_vencimiento_licencia', 'la fecha de vencimiento debe ser una fecha valida (AAAA-MM-DD)').isISO8601()
], actualizarConductor);

router.delete('/:id', eliminarConductor);

module.exports = router;