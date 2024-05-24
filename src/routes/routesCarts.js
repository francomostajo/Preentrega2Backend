import express from 'express';
import CartModel from '../dao/models/cart.model.js';

const router = express.Router();

// Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await CartModel.find().populate('products.productId').lean();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cart = new CartModel({ products: req.body.products });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: 'No se pudo crear el carrito' });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        const existingProductIndex = cart.products.findIndex(p => p.productId.equals(pid));
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ productId: pid, quantity: 1 });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito' });
    }
});

export default router;
