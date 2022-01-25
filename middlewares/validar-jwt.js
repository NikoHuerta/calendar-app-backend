const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-api-key');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token de autorización en request'
        });
    }

    try{
        const { uid, name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer usuario que esta haciendo uso del token
        const usuario = await Usuario.findById(uid);

        //verificar si el usuario existe en DB
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido -- usuario no existe en DB'
            });
        }

        //verificar si el uid tiene estado en true, (no borrado)
        if(!usuario.status){
            return res.status(401).json({
                msg: 'Token no válido -- estado: false'
            });
        }

        req.uid = uid;
        req.name = name;

        next();
    }catch(err){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido -- token invalido'
        });
    }

    

}

module.exports = {
    validarJWT
}