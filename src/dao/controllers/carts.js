import { promises as fs } from 'fs';

export class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.lastId = 0;
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.carts = JSON.parse(data);
            this.lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar carritos:', error);
        }
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error al guardar carritos:', error);
        }
    }

    async createCart() {
        try {
            this.lastId++;
            const newCart = {
                id: this.lastId,
                products: []
            };
            this.carts.push(newCart);
            await this.saveCarts();
            console.log('Nuevo carrito creado:', newCart);
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            return null;
        }
    }

    async getCartById(id) {
        const cart = this.carts.find(c => c.id === id);
        if (!cart) {
            console.error('Carrito no encontrado.');
        }
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.loadCarts();
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                console.error('Carrito no encontrado.');
                return null;
            }
            if (!cart.products) {
                cart.products = []; 
            }
            const existingProduct = cart.products.find(p => p.id === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ id: productId, quantity });
            }

            await this.saveCarts();
            console.log('Producto agregado al carrito:', cart);
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }
}