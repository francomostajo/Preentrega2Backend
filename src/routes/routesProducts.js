import express from 'express';
import ProductModel from '../dao/models/product.model.js';
import { socketServer } from '../app.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query, category, minPrice, maxPrice, availability } = req.query;
    
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 3),
        lean: true,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };

    const queryOptions = {};
    if (query) {
        queryOptions.$or = [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ];
    }
    if (category) queryOptions.category = category;
    if (minPrice) queryOptions.price = { $gte: minPrice };
    if (maxPrice) queryOptions.price = { $lte: maxPrice };
    if (availability) queryOptions.status = availability;

    try {
        const result = await ProductModel.paginate(queryOptions, options);
        result.prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&availability=${availability}` : '';
        result.nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&availability=${availability}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);

        res.render('products', result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductModel.findById(pid).lean();
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    const { title, category, description, price, thumbnail, code, stock, status } = req.body;
    try {
        const product = new ProductModel({ title, category, description, price, thumbnail, code, stock, status });
        await product.save();
        socketServer.emit('productAdded', product.toObject()); // Convierte el documento a objeto plano
        res.status(200).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo agregar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
        await ProductModel.findByIdAndUpdate(pid, updatedFields);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        await ProductModel.findByIdAndDelete(pid);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

export default router;