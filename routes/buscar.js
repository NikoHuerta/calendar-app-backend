const { Router } = require ('express');
const { buscar } = require('../controllers/buscar');

const { existeColeccion , validarCampos } = require('../middlewares');

/**
 *      {{url}}/api/buscar
 */


 const router = Router();


 router.get('/:coleccion/:termino', [
    existeColeccion,
    validarCampos
], buscar);


 module.exports = router;