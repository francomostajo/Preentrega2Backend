import UserModel from '../models/user.model.js';

export const findUserById = async (userId) => {
    return await UserModel.findById(userId).populate('cart');
};

export const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};

export const createUser = async (userData) => {
    const user = new UserModel(userData);
    await user.save();
    return user;
};

export const updateUser = async (userId, userData) => {
    return await UserModel.updateOne({ _id: userId }, userData);
};

export const deleteUser = async (userId) => {
    return await UserModel.deleteOne({ _id: userId });
};

export const findAllUsers = async () => {
    return await UserModel.find();
};