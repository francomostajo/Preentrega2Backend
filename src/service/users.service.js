import UserModel from '../dao/models/user.model.js';

export const getUsers = async () => {
    return await UserModel.find();
};

export const createUser = async (userData) => {
    const { nombre, apellido, email } = userData;
    if (!nombre || !apellido || !email) {
        throw new Error("Faltan parámetros");
    }
    return await UserModel.create({ nombre, apellido, email });
};

export const updateUser = async (uid, userData) => {
    return await UserModel.updateOne({ _id: uid }, userData);
};

export const deleteUser = async (uid) => {
    return await UserModel.deleteOne({ _id: uid });
};

export const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};