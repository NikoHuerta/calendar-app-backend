const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;


const { Usuario, Role } = require('../models');

const buscarUsuarios = async (termino = '', res = response) => {

    //es mongo id
    const esMongoID = ObjectId.isValid(termino); //true, false
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [ usuario ] : []
        });
    }
    
    //no es mongoID
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    return res.json({
        results: usuarios
    });
}

const buscarRole = async (termino = '', res = response) => {

    //es mongo id
    const esMongoID = ObjectId.isValid(termino); //true, false
    if(esMongoID){
        const role = await Role.findById(termino);
        return res.json({
            results: (role) ? [ role ] : []
        });
    }

    //no es mongoID
    const regex = new RegExp(termino, 'i');
    const role = await Role.find({ rol: regex });

    return res.json({
        results: role
    });
    
    
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;

        case 'roles':
            buscarRole(termino, res);
        break;

        // case 'categorias':
        //     buscarCategorias(termino, res);
        // break;

        // case 'productos':
        //     buscarProductos(termino, res);
        // break;

        // case 'porCategoria':
        //     buscarPorCategoria(termino, res);
        // break;

        default:
            return res.status(500).json({
                msg: `La busqueda para la coleccion ${coleccion} no esta implementada, consultelo con el administrador`
            })
    }
}

module.exports = {
    buscar
}

