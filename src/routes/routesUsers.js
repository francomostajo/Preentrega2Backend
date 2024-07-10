import { Router } from "express";
import {
    fetchAllUsers,
    createUser,
    fetchUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', fetchAllUsers);
router.post('/', createUser);
router.get('/:id', fetchUserById);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;