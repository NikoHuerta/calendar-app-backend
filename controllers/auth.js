const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async (req , res = response) => {

    const { email, password } = req.body;
    
    try{

        let usuario = await Usuario.findOne({ email });

        if( !usuario ){ //USUARIO NO EXISTE
            return res.status(400).json({
                ok: false,
                msg: 'Error al logear usuario -- email no esta registrado'
            });
        }

        // Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Error al logear usuario -- password invalida'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const googleSignIn = async (req , res = response) => {

    const { id_token } = req.body;
    
    try{ 
        const {name, email} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Hay que crearlo
            const data = {
                name,
                email,
                password: ':P',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario existe en DB hay que verificar su estado.
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //GENERAR EL JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    }catch(err){
        return res.status(400).json({
            msg: 'Token de Google no válido'
        });
    }
}

const revalidarToken = async (req , res = response) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    loginUsuario, 
    revalidarToken, 
    googleSignIn
}