const { Router } = require('express');
const { check } = require('express-validator');

const { existeEventoPorId, existeUsuarioPorId } = require('../helpers/bd-validators');
const { obtenerEventosUsuario, obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos');
const { validarCampos, validarJWT } = require('../middlewares');

const { isDate } = require('../helpers/date-validators');

const router = Router();
/*
    Rutas de Eventos
    {{url}} + /api/eventos
*/


//Todas las rutas de abajo pasan por la validacion de JWT
router.use( validarJWT );

//Obtener Eventos  (todos)
router.get('/', [
    validarCampos,
],
obtenerEventos);

//Obtener Eventos por Usuario
router.get('/usuario', [
    validarCampos
],
obtenerEventosUsuario)

//Crear Evento
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('start', 'La fecha de inicio es invalida').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').not().isEmpty(),
    check('end', 'La fecha de fin es invalida').custom( isDate ),

    validarCampos,
],
crearEvento);

//Editar Evento
router.put('/:id', [
    check('id').custom(existeEventoPorId),
    check('start', 'La fecha de inicio es invalida').optional().custom( isDate ),
    check('end', 'La fecha de fin es invalida').optional().custom( isDate ),
    validarCampos,
],
actualizarEvento);

//Borrar Evento
router.delete('/:id', [
    check('id').custom(existeEventoPorId),
    validarCampos,
],
eliminarEvento);


module.exports = router;