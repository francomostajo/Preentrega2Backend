import express from 'express';
import ProductModel from '../dao/models/product.model.js';
import UserModel from '../dao/models/user.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    try {
        const user = await UserModel.findById(req.user._id).lean();
        res.render('home', { user });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});
router.get('/products', async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let sort = req.query.sort || 'asc';
    let category = req.query.category || '';
    let availability = req.query.availability || '';

    let filter = {};
    if (category) filter.category = category;
    if (availability) filter.status = availability;

    try {
        let result = await ProductModel.paginate(filter, {
            page,
            limit: 5,
            lean: true,
            sort: { price: sort === 'asc' ? 1 : -1 }
        });

        result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        const user = await UserModel.findById(req.user._id).lean();
        res.render('products', { docs: result.docs, user });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});
router.get('/chat', (req, res) => {
    res.render('chat');
});
router.get('/register', (req, res) => {
    res.render('register');
}); 

router.get('/login', (req, res) => {
    res.render('login');
}); 
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

export default router;