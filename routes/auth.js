const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');
const { loginUsuario, revalidarToken, googleSignIn } = require('../controllers/auth');

const router = Router();
/*
    Rutas de Usuarios / Auth
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

//Revalidar JWT
router.get('/renew', validarJWT, revalidarToken);



module.exports = router;