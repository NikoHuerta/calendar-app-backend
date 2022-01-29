const { Router } = require ('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar');

const { existeColeccion , validarCampos, resError } = require('../middlewares');

/**
 *      Rutas de Busqueda
 *      {{url}} + /api/buscar/:coleccion/:termino
 */


 const router = Router();


router.get('/:coleccion', [
    existeColeccion,
    validarCampos,
    resError //resolve error
]);

router.get('/:coleccion/:termino', [
    existeColeccion,
    validarCampos
], buscar);


 module.exports = router;