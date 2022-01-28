const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
/*
    Rutas de Eventos
    {{url}} + /api/eventos
*/

//Obtener Eventos PUBLICA
router.get('/', [
    validarCampos,
],
obtenerEventos);

//Todas las rutas de abajo pasan por la validacion de JWT
router.use( validarJWT );

//Crear Evento
router.post('/', [
    validarCampos,
],
crearEvento);

//Editar Evento
router.put('/:id', [
    validarCampos,
],
actualizarEvento);

//Borrar Evento
router.delete('/:id', [
    validarCampos,
],
eliminarEvento);


module.exports = router;