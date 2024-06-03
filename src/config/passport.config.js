import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../dao/models/user.model.js';
import bcrypt from 'bcrypt';

const initializePassport = () => {
    // Configuración de la estrategia local
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            // Verifica las credenciales del usuario
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Serialización y deserialización del usuario
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default initializePassport;