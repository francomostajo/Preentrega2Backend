import mongoose from 'mongoose';

const cartCollection = "carritos"

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ]
})


const cartModel= mongoose.model(cartCollection,cartSchema)

export default cartModel