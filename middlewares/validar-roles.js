const { response, request } = require("express")


const esAdminRole = (req, res = response, next) =>{
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, name } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `El usuario ${ name } no es administrador -- No puede acceder a este recurso`
        });
    }

    next();

}

const tieneRole = (...roles) => {

    return (req, res= response, next) => {
        
        //verificacion del token
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        //verificacion que el usuario posee un rol especifico
        if(!roles.includes(req.usuario.rol))
        {
            return res.status(401).json({
                msg: `El servicio requiere de uno de estos roles: ${ roles }`
            });
        }
        
        next();
    }

}

module.exports= {
    esAdminRole,
    tieneRole
}

