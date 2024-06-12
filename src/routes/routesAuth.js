import express from 'express';
import passport from 'passport';
import User from '../dao/models/user.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const user = new User({ first_name, last_name, email, password });
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            user.role = 'admin';
        } else {
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

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

export default router;