import passport from 'passport';
import { registerUser, authenticateUser } from '../service/auth.service.js';

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await authenticateUser(req.body.email, req.body.password);
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/products');
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.render('login', { message: req.flash('error') });
    }
};

export const logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};

export const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Error de autenticación con GitHub');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.user = req.user;
            return res.redirect('/products');
        });
    })(req, res, next);
};

export const getCurrentUser = (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
};