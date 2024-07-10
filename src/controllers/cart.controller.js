import { getAllCarts, createCart, addProductToCart, addProductToUserCart } from '../service/cart.service.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewCart = async (req, res) => {
    try {
        const cart = await createCart(req.body.products);
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await addProductToCart(cid, pid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addProductToUser = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        const cart = await addProductToUserCart(userId, productId, quantity);
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};