//validador de colecciones

const { response, request } = require("express")
const mongoose = require('mongoose');
require('dotenv').config();



const conn = mongoose.createConnection(process.env.MONGODB_CNN, { });

const existeColeccion = (req, res = response, next) =>{

    const { coleccion } = req.params;
    if(coleccion === 'porCategoria' ) return next(); //condicion para buscar por categoria

    conn.db.listCollections({name: coleccion})
        .next((err, collinfo)=> {
            if(!collinfo){ 
                return res.status(400).json({
                    msg: `La coleccion ${ coleccion } no existe`
                });
            }
            else{
                //console.log(collinfo);
                next();
            }
        });
}

module.exports= {
    existeColeccion
}