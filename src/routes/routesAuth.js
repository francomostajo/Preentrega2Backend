import express from 'express';
import { register, login, logout, githubAuth, githubCallback, getCurrentUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/github', githubAuth);
router.get('/githubcallback', githubCallback);
router.get('/current', getCurrentUser);

export default router;