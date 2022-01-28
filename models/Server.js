const express = require('express'); //minimalist web framework for Node.js applications
const cors = require('cors'); //CORS-> Cross-origin resource sharing (CORS) 
// const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { validarJSON } = require('../middlewares/validar-json');
const { dbConnection } = require('../db/config');
// const { socketController } = require('../sockets/controller');


class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        // this.io = require('socket.io')(this.server);

        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            buscar:     '/api/buscar',
            eventos:    '/api/eventos',
            // categorias: '/api/categorias',
            // productos:  '/api/productos',
            // uploads:    '/api/uploads',
        }

        //Conectar a DB
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //Socket Events
        // this.sockets();
    }

    async connectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS-> Cross-origin resource sharing (CORS) 
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Validacion de JSON req
        this.app.use(validarJSON);

        //Directorio Público
        this.app.use(express.static('public'));

        // //Fileupload -- carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.eventos, require('../routes/eventos'));
        // this.app.use(this.paths.categorias, require('../routes/categorias'));
        // this.app.use(this.paths.productos, require('../routes/productos'));
        // this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    // sockets(){
    //     this.io.on('connection', (socket) => socketController(socket, this.io));
    // }

    listen(){
        this.server.listen(this.port, () => {
            console.log("Server REST running in port ", this.port);
        });
    }
}

module.exports = {
    Server
};