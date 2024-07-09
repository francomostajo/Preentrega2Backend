import UserModel from '../dao/models/user.model.js';
import bcrypt from 'bcrypt';

export const registerUser = async (userData) => {
    const { first_name, last_name, email, age, password } = userData;
    const user = new UserModel({ first_name, last_name, email, age, password });
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        user.role = 'admin';
    } else {
        user.role = 'user';
    }
    await user.save();
    return user;
};

export const authenticateUser = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
    }
    return user;
};