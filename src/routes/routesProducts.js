import express from 'express';
import {
    getProducts,
    getCategories,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
router.get('/products/:pid', getProductById);
router.post('/products', createProduct);
router.put('/products/:pid', updateProduct);
router.delete('/products/:pid', deleteProduct);

export default router;