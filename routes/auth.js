const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validaCampos } = require('../middlewares/validar-campos');

const router = Router();
/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

//Crear Usuario
router.post('/new',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio o invalido').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validaCampos
], 
crearUsuario);

//Login Usuario
router.post('/',[
    check('email', 'El email es obligatorio o invalido').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validaCampos
],
loginUsuario);
//Revalidar JWT
router.get('/renew', revalidarToken);



module.exports = router;