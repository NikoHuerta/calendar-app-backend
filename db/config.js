const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            /* useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
            useFindAndModify: false */
            //desde mongoose 6.0, esto de arriba no es necesario, por default
        });

        console.log('DB online');
    }
    catch(err){
        console.log(err);
        throw new Error('Error a la hora de inicializar la DB');    
    }

}


module.exports = {
    dbConnection
};