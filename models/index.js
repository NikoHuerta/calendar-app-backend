const Role = require('./Role');
const Usuario = require('./Usuario');
const Evento = require('./Evento');
const Server = require('./Server');
// const Categoria = require('./categoria');
// const Producto = require('./producto');
// const ChatMensajes = require('./chat-mensajes');


// No se exporta un objeto, sino que directamente se exporta el modelo y no es necesario usar la desestructuración:
module.exports = {
    Role,
    Usuario,
    Evento,
    Server
    // Categoria,
    // Producto,
    // ChatMensajes,
}