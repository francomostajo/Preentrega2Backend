import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';
const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    thumbnail: String,
    category: String,
    status: String
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);
export default productModel;