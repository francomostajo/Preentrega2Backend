import MessageModel from './models/message.model.js';

const initializeSockets = (socketServer) => {
    socketServer.on('connection', socket => {
        console.log("Nuevo cliente conectado");

        // Emitir mensajes anteriores al cliente al conectar
        MessageModel.find().sort({ timestamp: 1 }).lean().then(messages => {
            socket.emit('chatHistory', messages);
        });

        socket.on('chatMessage', async (data) => {
            const message = new MessageModel({ user: data.user, message: data.message });
            await message.save();
            socketServer.emit('message', message.toObject());
        });
    });
};

export { initializeSockets };