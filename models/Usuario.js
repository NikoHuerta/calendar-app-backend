const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// UsuarioSchema.methods.toJSON = function(){
// }

module.exports = model('Usuario', UsuarioSchema );