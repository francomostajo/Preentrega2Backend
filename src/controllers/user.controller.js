import {
    getAllUsers,
    getUserById,
    getUserByEmail,
    registerUser,
    modifyUser,
    removeUser
} from '../service/users.service.js';

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send({ result: "success", payload: users });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los usuarios' });
    }
};

export const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.send({ result: "success", payload: user });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el usuario' });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.send({ result: "success", payload: user });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el usuario' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await modifyUser(uid, req.body);
        res.send({ result: "success", payload: user });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        await removeUser(uid);
        res.send({ result: "success" });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el usuario' });
    }
};