import { getProducts as fetchProducts, getCategories as fetchCategories } from '../service/product.service.js'; // Asegúrate de que esta ruta sea correcta

export const getProducts = async (req, res) => {
    try {
        const products = await fetchProducts(req.query);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await fetchCategories();
        res.json({ status: 'success', categories });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};


export const getProductById = async (req, res) => {
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
};

export const createProduct = async (req, res) => {
    const { title, category, description, price, thumbnail, code, stock, status } = req.body;
    try {
        const product = new ProductModel({ title, category, description, price, thumbnail, code, stock, status });
        await product.save();
        res.status(200).json({ message: 'Producto agregado correctamente', product });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo agregar el producto' });
    }
};

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
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(pid);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};