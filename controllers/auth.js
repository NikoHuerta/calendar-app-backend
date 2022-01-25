const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req , res = response) => {
    
    const { email, password } = req.body;
    
    try{
        
        let usuario = await Usuario.findOne({ email });

        if( usuario ){ //USUARIO YA EXISTE
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear usuario -- mail ya existe'
            });
        }

        usuario = new Usuario( req.body );
        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
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

const revalidarToken = async (req , res = response) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}