import mongoose from 'mongoose';

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model(messageCollection, messageSchema);

export default MessageModel;