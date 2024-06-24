import express from 'express';
import Cart from '../dao/models/cart.model.js';
import User from '../dao/models/user.model.js';

const router = express.Router();

// Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.productId').lean();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cart = new Cart({ products: req.body.products });
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
        const cart = await Cart.findById(cid);
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

router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        // Verifica si el usuario tiene un carrito existente
        let user = await User.findById(userId).populate('cart');
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        if (!user.cart) {
            // Si el usuario no tiene un carrito, crea uno nuevo
            const newCart = new Cart({ products: [] });
            user.cart = newCart._id;
            await newCart.save();
            await user.save();
        }

        // Obtén el carrito del usuario
        const cart = await Cart.findById(user.cart._id);
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        // Verifica si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
        if (productIndex >= 0) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            cart.products[productIndex].quantity += parseInt(quantity);
        } else {
            // Si el producto no está en el carrito, agrégalo
            cart.products.push({ productId, quantity: parseInt(quantity) });
        }

        // Guarda el carrito actualizado
        await cart.save();
        res.json({ success: true, cart });
    } catch (err) {
        console.error('Error al agregar el producto al carrito:', err); // Agregar logging para depuración
        res.status(500).json({ success: false, error: 'Error al agregar el producto al carrito', details: err.message });
    }
});

export default router;