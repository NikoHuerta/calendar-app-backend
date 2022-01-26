const Role = require('./Role');
const Usuario = require('./Usuario');
const Server = require('./Server');
// const Categoria = require('./categoria');
// const Producto = require('./producto');
// const ChatMensajes = require('./chat-mensajes');


// No se exporta un objeto, sino que directamente se exporta el modelo y no es necesario usar la desestructuración:
module.exports = {
    Role,
    Usuario,
    Server
    // Categoria,
    // Producto,
    // ChatMensajes,
}