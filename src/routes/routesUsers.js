import express from 'express';
import { getAllUsers, addUser, loginUser, modifyUser, removeUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.post('/login', loginUser);
router.put('/:uid', modifyUser);
router.delete('/:uid', removeUser);

export default router;