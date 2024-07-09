import { getUsers, createUser, updateUser, deleteUser, findUserByEmail } from '../service/users.service.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.send({ result: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        const result = await createUser(req.body);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).send({ status: 'error', error: 'Usuario no encontrado' });
        }
        // Aquí puedes hacer más validaciones, como verificar la contraseña
        return res.send({ status: 'success', message: 'Login exitoso' });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export const modifyUser = async (req, res) => {
    try {
        const result = await updateUser(req.params.uid, req.body);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
    }
};

export const removeUser = async (req, res) => {
    try {
        const result = await deleteUser(req.params.uid);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};