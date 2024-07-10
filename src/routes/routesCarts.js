import express from 'express';
import { getCarts, createNewCart, addProduct, addProductToUser } from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', getCarts);
router.post('/', createNewCart);
router.post('/:cid/product/:pid', addProduct);
router.post('/add', addProductToUser);

export default router;