import express from 'express';
import MessageModel from '../dao/models/message.model.js';

const router = express.Router();

// Obtener todos los mensajes
router.get('/', async (req, res) => {
    try {
        const messages = await MessageModel.find().lean();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes', error });
    }
});

// Crear un nuevo mensaje
router.post('/', async (req, res) => {
    const { user, message } = req.body;
    try {
        const newMessage = new MessageModel({ user, message });
        await newMessage.save();
        res.status(201).json({ message: 'Mensaje guardado correctamente', newMessage });
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el mensaje', error });
    }
});

export default router;