const { Router } = require('express');
const { check } = require('express-validator');
const { autenticar } = require('../middlewares/auth.middleware');
const { 
    obtenerVehiculos, 
    obtenerVehiculoPorId, 
    crearVehiculo, 
    actualizarVehiculo, 
    eliminarVehiculo 
} = require('../controllers/vehiculo.controller');

const router = Router();

// todas las rutas de vehiculos requieren token JWT
router.use(autenticar);

router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculoPorId);

router.post('/', [
    check('marca', 'la marca es obligatoria').not().isEmpty(),
    check('modelo', 'el modelo es obligatorio').not().isEmpty(),
    check('patente', 'la patente es obligatoria').not().isEmpty(),
    check('anio', 'el anio debe ser un numero valido').isNumeric(),
    check('capacidad_carga', 'la capacidad de carga debe ser numerica').isNumeric()
], crearVehiculo);

router.put('/:id', [
    check('marca', 'la marca es obligatoria').not().isEmpty(),
    check('modelo', 'el modelo es obligatorio').not().isEmpty(),
    check('patente', 'la patente es obligatoria').not().isEmpty(),
    check('anio', 'el anio debe ser un numero valido').isNumeric(),
    check('capacidad_carga', 'la capacidad de carga debe ser numerica').isNumeric()
], actualizarVehiculo);

router.delete('/:id', eliminarVehiculo);

module.exports = router;