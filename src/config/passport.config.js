import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GitHubStrategy from 'passport-github2';
import UserModel from '../dao/models/user.model.js';
import bcrypt from 'bcrypt';

const initializePassport = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
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

    passport.use('github', new GitHubStrategy({
        clientID: "Iv23liBRALCgycATkEmq",
        clientSecret: "4ae3e3a936c445a227daf7ccf348daf68f477153",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await UserModel.findOne({ email: profile._json.email });
            if (!user) {
                const newUser = new UserModel({
                    first_name: profile._json.name.split(' ')[0] || "GitHub",
                    last_name: profile._json.name.split(' ')[1] || "User",
                    email: profile._json.email,
                    password: bcrypt.hashSync(Math.random().toString(36).substring(2), 10), // Podrías generar una contraseña aleatoria si es necesario

                });
                await newUser.save();
                done(null, newUser);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

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