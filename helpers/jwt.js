const jwt = require('jsonwebtoken');

const generarJWT = async ( uid, name) => {

    return new Promise( (resolve , reject) => {
        
        const payload = { uid, name };
        jwt.sign(payload, 
                process.env.SECRETORPRIVATEKEY, 
                { expiresIn: '1h' }, 
                (err, token) => { 
                    if(err){
                        console.log(err);
                        reject('No se pudo generar el token');
                    } else {
                        resolve(token);
                    }
                }
        );
    });
}


module.exports = {
    generarJWT
}