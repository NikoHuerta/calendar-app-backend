const express = require('express');
require('dotenv').config();

const { validarJSON } = require('./middlewares/validar-json');



// Crear el servidor de express
const app = express();

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Validacion de JSON req
app.use(validarJSON);

// Rutas
app.use('/api/auth', require('./routes/auth') );

// TODO: CRUD: Eventos




// Escuchar Peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});