import {
    findUserById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    findAllUsers
} from '../dao/data/userDao.js';

export const getAllUsers = async () => {
    return await findAllUsers();
};

export const getUserById = async (userId) => {
    return await findUserById(userId);
};

export const getUserByEmail = async (email) => {
    return await findUserByEmail(email);
};

export const registerUser = async (userData) => {
    return await createUser(userData);
};

export const modifyUser = async (userId, userData) => {
    return await updateUser(userId, userData);
};

export const removeUser = async (userId) => {
    return await deleteUser(userId);
};