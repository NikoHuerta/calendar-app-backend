const { response, request } = require('express');
const { Evento } = require('../models');

const obtenerEventos = (req = request , res = response) => {
    return res.status(200).json({
        ok: true,
        req: 'obtenerEventos'
    });
};
const crearEvento = (req = request , res = response) => {

    //verificar que tenga el evento
    console.log(req.body);



    return res.status(201).json({
        ok: true,
        req: 'crearEvento'
    });
};
const actualizarEvento = (req = request , res = response) => {
    return res.status(200).json({
        ok: true,
        req: 'actualizarEvento'
    });
};
const eliminarEvento = (req = request , res = response) => {
    return res.status(200).json({
        ok: true,
        req: 'eliminarEvento'
    });
};



module.exports = {
    obtenerEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}