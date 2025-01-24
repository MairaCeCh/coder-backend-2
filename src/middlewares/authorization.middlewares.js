


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