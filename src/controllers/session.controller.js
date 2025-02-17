import { userDao } from "../dao/mongo/user.dao.js";
import { createHash } from "../utils/hashPassword.js";
import { createToken } from '../utils/jwt.js';

export class SessionController {
    async register(req, res) {
        try {
            res.status(201).json({ status: "success", payload: "usuario registrado" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: "error", msg: "Error en la creación de la sesión" });
        }
    }

    async login(req, res) {
        try {
            console.log("req.user", req.user);
            const token = createToken(req.user);
            res.cookie("token", token, { httpOnly: true });
            console.log("🚀 ~ router.post ~ res.cookie:", token);
            
            res.status(200).json({ status: "success", payload: req.user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor" });
        }
    }

    async profile(req, res) {
        try {
            if (!req.session.user) return res.status(404).json({ status: "error", msg: "usuario no logueado" });
            if (req.session.user.role !== "user") return res.status(403).json({ status: "error", msg: "usuario no autorizado" });

            res.status(200).json({ status: "success", payload: req.session.user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("token")
            res.status(200).json({ status: "success", msg: "Sesión cerrada" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
        }
    }

    async restorePassword(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userDao.getByEmail(email);

            await userDao.update(user._id, { password: createHash(password) });

            res.status(200).json({ status: "success", payload: "password actualizado" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
        }
    }

    async googleCallback(req, res) {
        return res.status(200).json({ status: "success", session: req.user });
    }

    async current(req, res) {
        res.json({ status: "ok", user: req.user });
    }
}

export const sessionController = new SessionController();