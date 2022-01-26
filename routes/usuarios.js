const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const { crearUsuario, updateUsuario, obtenerUsuario, borrarUsuario } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/bd-validators');

const router = Router();

/*
    Rutas de Usuarios / Auth
    host + /api/usuarios
*/


//Crear Usuario
router.post('/',[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email es obligatorio o invalido').isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], 
crearUsuario);

//Actualizar Usuario
router.put('/:id',[
    validarJWT,
    //check('id', 'No es un id válido').isMongoId(), --> error, unida a validacion custom existeUsuarioPorId
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos // --> Verificar errores por middleware creado, express-validator
], 
updateUsuario);

//Obtener Usuarios
router.get('/',[
    validarJWT,
    check('limit', 'El limit debe ser numerico').isNumeric().optional({nullable: true}),
    check('desde', 'Parametro desde debe ser numerico').isNumeric().optional({nullable: true}),
    validarCampos
], obtenerUsuario);

//Borrar Usuario
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], borrarUsuario);

module.exports = router;