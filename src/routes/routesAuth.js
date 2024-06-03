import express from 'express';
import passport from 'passport';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, password });
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            user.role = 'admin';
        } else {
            // Si no es un usuario admin, asignar otro rol (por ejemplo, 'user')
            user.role = 'user';
        }
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', (req, res, next) => {
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
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;