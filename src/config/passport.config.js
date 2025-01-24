

import passport from "passport";
import local from "passport-local";
import { userDao } from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import jwt from "passport-jwt";
import  { cartDao } from "../dao/cart.dao.js";

import google from "passport-google-oauth20"
import { cookieExtractor } from "../utils/cookieExtractor.js";


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTstrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;




export const initializedPassport = () => {

    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        try {
            const { first_Name, last_Name, age, role } = req.body;
            const user = await userDao.getByEmail(username);
            // console.log("🚀 ~ passport.use ~ user:", user)
            if (user) {
                return done(null, false, { message: "el usuario ya existe" });
              
            }
  const newCart = await cartDao.create();
            const newUser = {
                first_Name,
                last_Name,
                email: username,
                age,
                password: createHash(password),
                role,
                cart: newCart._id
            };

        console.log("newuser", newUser)
            const createUser = await userDao.create(newUser);
            done(null, createUser);
        } catch (error) {
            done(error);
        }
    }));

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userDao.getByEmail(username);
            if (!user) {
                return done(null, false, { message: "usuario no encontrado" });
            }
            const checkPass = isValidPassword(password, user);
            if (!checkPass) {
                return done(null, false, { message: "usuario no encontrado" });
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    }));

        passport.use("jwt", new JWTstrategy({  jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: "codigoSecreto"},
    async (jwt_payload, done)=>{
        try {
           const { email } = jwt_payload;
           const user = await userDao.getByEmail(email);
            done(null, user)
        } catch (error) {
            done(error);
    }}))



    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userDao.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};