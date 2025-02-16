
import {decodedToken } from "../utils/jwt.js";

export const authorization = (role) => {
    return (req, res, next) => {
        if (!req.cookies.token) {
            return res.status(401).json({ status: "error", msg: "No estás autenticado" });
        }
        if (decodedToken(req.cookies.token).role !== role) {
            return res.status(403).json({ status: "error", msg: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};