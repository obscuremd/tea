import mongoose, { models } from "mongoose"


const PostSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true  
    },
    location:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required:true
    },
    image:{
        type: String,
    },
    likes:{
        type: Array,
        default:[]
    },
    comments:{
        type: Array,
        default:[]
    },

    },
    {timestamps:true}
)


const Posts = mongoose.model('Post', PostSchema) || models.Post

export default Posts