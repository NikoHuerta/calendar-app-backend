const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    end: {
        type: Date,
        required: [true, 'La fecha de finalización es obligatoria']
    },
    status: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }    
});

EventoSchema.methods.toJSON = function(){  //funcion normal para llamar a this de esta instancia, si fuera funcion de flecha llamar al this apunta a la instancia fuera de la misma
    const { __v, _id, status, ... data } = this.toObject();
    data.eventId = _id;

    return data;
}


module.exports = model('Evento', EventoSchema);