import mongoose from 'mongoose';

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, required: true }
        }
    ]
});

const Cart = mongoose.model(cartCollection, cartSchema);

export default Cart;