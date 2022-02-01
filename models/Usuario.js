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
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    google: {
        type: Boolean,
        default: false,
    },
    facebook: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// UsuarioSchema.methods.toJSON = function(){
// }
UsuarioSchema.methods.toJSON = function(){  //funcion normal para llamar a this de esta instancia, si fuera funcion de flecha llamar al this apunta a la instancia fuera de la misma
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
    //usuario;
}

module.exports = model('Usuario', UsuarioSchema );