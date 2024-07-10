import express from 'express';
import passport from 'passport';
import {
    registerUser,
    loginUser,
    logoutUser,
    githubCallback,
    getCurrentUser
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback);
router.get('/current', getCurrentUser);

export default router;