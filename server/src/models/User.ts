import mongoose, { models } from "mongoose"


const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            min:3,
            max:20,
            unique: true
        },
        fullName:{
            type: String,
            required: true,
            min:3,
            max:20,
            unique: true
        },
        email:{
            type: String,
            required: true,
            max:50,
            unique: true
        },
        profilePicture:{
            type: String,
            default:""
        },
        coverPicture:{
            type: String,
            default:""
        },
        followers:{
            type: Array,
            default:[]
        },
        following:{
            type: Array,
            default:[]
        },
    },
    {timestamps:true}
)


const User = mongoose.model('User', UserSchema) || models.User

export default User