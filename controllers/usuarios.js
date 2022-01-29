const { response } = require('express');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
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


const updateUsuario = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, ...resto  } = req.body; //Rest Parameters, gathers the rest of the list of arguments into an array

    //TODO: validar contra DB
    if(password){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        usuario
    });
}

const obtenerUsuario = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { status: true };

    // const usuarios = await Usuario.find(query)
    //                         .skip(Number(desde))
    //                         .limit(Number(limit));
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find( query )
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
                            
    res.json({
        total,
        usuarios
    });
}

const borrarUsuario = async (req, res = response) => {
    
    const { id } = req.params;

    //Status borrado
    const usuario = await Usuario.findByIdAndUpdate(id, { status: false });
    //const usuarioAutenticado = req.uid;

    res.json({
        usuario
        //usuarioAutenticado
    });
}

module.exports = {
    crearUsuario,
    updateUsuario,
    obtenerUsuario,
    borrarUsuario
}