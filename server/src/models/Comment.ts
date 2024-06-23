import mongoose, { models } from "mongoose"


const CommentSchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true,
    },
    text:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    }
})

const Comment = mongoose.model('comments', CommentSchema) || models.comments

export default Comment