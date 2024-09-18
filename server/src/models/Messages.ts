import mongoose, { models } from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        conversationId:{type: String},
        sender:{type: String},
        text:{type: String},
    },
    {timestamps: true}
)

const Message = mongoose.model('message', MessageSchema) || models.message

export default Message