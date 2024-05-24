import express from 'express';
/* import { ProductManager } from '../dao/products.js'; */
import ProductModel from '../dao/models/product.model.js';

const router = express.Router();
/* const manager = new ProductManager('./src/data/Productos.json'); */


router.get('/products', async (req, res) => {
  try {
      const products = await ProductModel.find().lean();
      res.render('products', { products });
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
  }
});
router.get('/realtimeproducts',async (req, res) => {
    await manager.loadProducts(); 
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = limit ? manager.getProducts().slice(0, limit) : manager.getProducts();
    res.render('realTimeProducts', { products });
  });

  router.get('/chat', (req, res) => {
    res.render('chat');
});
  
export default router;