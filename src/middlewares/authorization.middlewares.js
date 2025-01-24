

// export const initializedPassport = (role) => {
//     return async (req, res, next) => {
//         if(!req.user)
//             return res.status(401).json({error: "no autorizado"})
//         if(req.user.role !== role)
//             return res.status(403).json({error: "rol invalido"})
//     }}
export const authorization = (role) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ status: "error", msg: "No estás autenticado" });
        }
        if (req.session.user.role !== role) {
            return res.status(403).json({ status: "error", msg: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};