const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');
const { loginUsuario, revalidarToken, googleSignIn, facebookSignIn } = require('../controllers/auth');

const router = Router();
/*
    Rutas de Autenticacion
    {{url}} + /api/auth
*/

//Login Usuario
router.post('/',[
    check('email', 'El email es obligatorio o invalido').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
],
loginUsuario);

//Login Usuario Google
router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

router.post('/facebook', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    check('name', 'El nombre es obligatorio o invalido').not().isEmpty(),
    check('email', 'El email es obligatorio o invalido').isEmail(),
    validarCampos
], facebookSignIn);

//Revalidar JWT
router.get('/renew', validarJWT, revalidarToken);



module.exports = router;