import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;