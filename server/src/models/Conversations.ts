import mongoose, { models } from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        members:{type:Array}
    },
    {timestamps: true}
)

const Conversations = mongoose.model('conversations', ConversationSchema) || models.conversations

export default Conversations