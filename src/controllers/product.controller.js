import ProductModel from '../dao/models/product.model.js';
import { socketServer } from '../app.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const productos = await ProductModel.find().lean();
        res.render('home', { productos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        console.log(`Buscando producto con ID: ${pid}`);
        const product = await ProductModel.findById(pid).lean();
        if (!product) {
            console.warn(`Producto con ID ${pid} no encontrado`);
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${pid}:`, error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { title, category, description, price, thumbnail, code, stock, status } = req.body;
    try {
        const product = new ProductModel({ title, category, description, price, thumbnail, code, stock, status });
        await product.save();
        socketServer.emit('productAdded', product.toObject()); // Convierte el documento a objeto plano
        res.status(200).json({ message: 'Producto agregado correctamente', product });
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(400).json({ message: 'No se pudo agregar el producto' });
    }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(pid, updatedFields, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado correctamente', updatedProduct });
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${pid}:`, error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(pid);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        console.error(`Error al eliminar el producto con ID ${pid}:`, error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};