const { response, request } = require('express');
const { Evento } = require('../models');

const obtenerEventos = async (req = request , res = response) => {
    
    const query = { status: true };
    const [total, eventos] = await Promise.all([
        Evento.countDocuments( query ),
        Evento.find( query )
            .populate('usuario',['name','email'])
    ]);

    return res.status(200).json({
        ok: true,
        total,
        eventos
    });
};
const crearEvento = async (req = request , res = response) => {

    const evento = new Evento( req.body );
    try {
        evento.usuario = req.usuario._id;
        const eventoGuardado = await evento.save();
        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear evento, hable con el administrador'
        });
    }
};
const actualizarEvento = async (req = request , res = response) => {

    const { id } = req.params;
    const uid = req.usuario._id;

    const {...body} = req.body; //opcionales en ...body --> title, notes, start, end, status
    try{

        if(!(body.title || body.start || body.end || body.notes || body.status)) return res.status(401).json({ ok: false, msg: 'No hay datos que actualizar' });

        const evento = await Evento.findById( id );
        if(evento.usuario.toString() !== uid.toString()) return res.status(401).json({ ok: false , msg: 'No tiene privilegios de editar este evento' });

        const nuevoEvento = {
            ...body,
            usuario: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, { new: true });

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });
        
    }catch(err){
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento, hable con el administrador'
        });
    }
};

const eliminarEvento = async (req = request , res = response) => {
    
    const { id } = req.params;
    const uid = req.usuario._id;
    
    try{

        const evento = await Evento.findById( id );
        if(evento.usuario.toString() !== uid.toString()) return res.status(401).json({ ok: false , msg: 'No tiene privilegios de editar este evento' });

        const nuevoEvento = {
            ...evento._doc,
            status: false
        };

        const eventoBorrado = await Evento.findByIdAndUpdate(id, nuevoEvento, { new: true });

        return res.status(200).json({
            ok: true,
            evento: eventoBorrado
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar evento, hable con el administrador'
        });
    }
};



module.exports = {
    obtenerEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}