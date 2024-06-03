import express from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';
import UserModel from '../dao/models/user.model.js';
import ProductModel from '../dao/models/product.model.js';

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).lean();
        res.render('home', { user });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

router.get('/products', isAuthenticated, async (req, res) => {
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

router.get('/chat', isAuthenticated, (req, res) => {
    res.render('chat');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

export default router;