

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarJSON = require('../middlewares/validar-json');
const validaRoles = require('../middlewares/validar-roles');
const validaColeccion = require('../middlewares/validar-coleccion');


module.exports = {
    ... validarCampos,
    ... validarJWT,
    ... validarJSON,
    ... validaRoles,
    ... validaColeccion,
}