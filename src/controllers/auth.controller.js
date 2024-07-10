import { register, authenticateUser } from '../service/auth.service.js';
import passport from 'passport';

export const registerUser = async (req, res) => {
    try {
        const user = await register(req.body);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
};

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Usuario no registrado. Por favor, regístrese.');
            return res.render('login', { message: req.flash('error') });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/products');
        });
    })(req, res, next);
};

export const logoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
};

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
};

export const getCurrentUser = (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
};