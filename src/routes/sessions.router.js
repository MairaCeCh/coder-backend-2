
import { Router } from 'express';
import { userDao } from "../dao/user.dao.js";
import { createHash } from "../utils/hashPassword.js";
import passport from 'passport';
import { createToken,  verifyToken  } from '../utils/jwt.js';
import { passportCall } from '../middlewares/passportCall.middlewares.js';
import { authorization } from '../middlewares/authorization.middlewares.js';

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
    try {
        res.status(201).json({ status: "success", payload: "usuario registrado" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", msg: "Error en la creación de la sesión" });
    }
});

router.post("/login", passportCall("login"), async (req, res) => {
    try {
        console.log("req.user", req.user);
      const token = createToken(req.user);
      res.cookie("token", token, { httpOnly: true });
      console.log("🚀 ~ router.post ~ res.cookie222:", res.cookie.token)
      console.log("🚀 ~ router.post ~ res.cookie:", token)
      
      res.status(200).json({ status: "success", payload: req.user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  });

router.get("/profile", async (req, res) => {
    try {
        if(!req.session.user) return res.status(404).json({ status: "error", msg: "usuarion no logueado" });
        if( req.session.user.role !== "user" ) return res.status(403).json({ status: "error", msg: "usuarion no autorizado" });

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


router.get("/current", passportCall("jwt"), authorization("admin"), async (req, res) => {


res.json({status: "ok", user: req.user}); 
});

export default router;