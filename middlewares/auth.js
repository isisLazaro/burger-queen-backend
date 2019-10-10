import tokenService from "../services/token";

export default {
    verifyUser: async (req,res,next) =>{
        if (!req.headers.token) {
            return res.status(404).send({
                message: "no existe el token, no hay usuario autenticado"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == "Administradora" || response.rol == "Mesero" || response.rol == "Mesera"){
            next();
        } else {
            return res.status(403).send({
                message: "Usuario no autorizado"
            });
        }
    },
    verifyAdministradora: async (req,res,next) =>{
        if (!req.headers.token) {
            return res.status(404).send({
                message: "no existe el token, no hay usuario autenticado"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == "Administradora"){
            next();
        } else {
            return res.status(403).send({
                message: "Usuario no autorizado // solo Administradora"
            });
        }
    },
    verifyMesera: async (req,res,next) =>{
        if (!req.headers.token) {
            return res.status(404).send({
                message: "no existe el token, no hay usuario autenticado"
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == "Administradora" || response.rol == "Mesero" || response.rol == "Mesera"){
            next();
        } else {
            return res.status(403).send({
                message: "Usuario no autorizado // solo Mesera y Administradora"
            });
        }
    }
}