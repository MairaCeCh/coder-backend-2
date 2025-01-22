

import passport from "passport";
import local from "passport-local";
import { userDao } from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

import google from "passport-google-oauth20"


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;

export const initializedPassport = () => {

    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        try {
            const { firstName, lastName, age } = req.body;
            const user = await userDao.getByEmail(username);
            if (user) {
                return done(null, false, { message: "el usuario ya existe" });
            }

            const newUser = {
                firstName,
                lastName,
                email: username,
                age,
                password: createHash(password)
            };
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