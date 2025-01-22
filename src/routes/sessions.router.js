
import { Router } from 'express';
import { userDao } from "../dao/user.dao.js";
import { createHash } from "../utils/hashPassword.js";
import passport from 'passport';
import { createToken } from '../utils/jwt.js';

const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
    try {
        res.status(201).json({ status: "success", payload: "usuario registrado" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", msg: "Error en la creación de la sesión" });
    }
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {
           req.session.user = {
          
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: "user"
           } 
           console.log("🚀 ~ router.post ~ req.session.user:", req.session.user)
           
           const token = createToken(req.user);
           console.log("🚀 ~ router.post ~ token:", token)
           

        res.status(200).json({ status: "success", payload: req.session.user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
    }
});


router.get("/profile", async (req, res) => {
    try {
        if(!req.session.user) return res.status(404).json({ status: "error", msg: "usuarion no logueado" });
        if( req.session.user.role !== "user" ) return res.status(403).json({ status: "error", msg: "usuarion no autorizadp" });

        res.status(200).json({ status: "success", payload: req.session.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy()

        res.status(200).json({ status: "success", msg: "Sesión cerrada" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
    }
});



router.put("/restore-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.getByEmail(email);

        await userDao.update(user._id, { password: createHash(password) })

        res.status(200).json({ status: "success", payload: "password actualizado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error en la creación de la sesión" });
    }
});



router.get("/google", passport.authenticate("google", { 
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), async (req, res) =>{
    return res.status(200).json({ status: "success", session: req.user });
})
export default router;