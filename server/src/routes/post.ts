import Post from '../models/Post'
import User from '../models/User'
import { Router } from 'express';


const router = Router()





// create a post
router.post('/:email',async(req, res)=>{
    const email = req.params.email
    const {location, image, desc} = (req.body)
    try {
        const savedPost = await Post.create({email, location, image, desc})
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all your own posts
router.get('/profile/:email', async (req, res) => {
    try {
        const user = await User.findOne({email:req.params.email})
        if(!user){
            res.status(404).json('user not found')
        }else{
            const posts = await Post.find({ email : user.email})
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// get a post by username
router.get('/:username', async(req, res)=>{
    const user = await User.findOne({ username: req.params.username})

    if(!user){
        res.status(404).json('user not found')
    }else{
        try {
            const post = await Post.find({email: user.email})
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json(error)
        }
    }

})

// get all posts
router.get('/', async(req, res)=>{
    try {
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        res.status(404).send(error)
    }
})

// update your post
router.put('/:id',async(req, res)=>{

    try {
        const post = await Post.findByIdAndUpdate(req.params.id)

        if(!post){
            res.status(404).json('post not found')
        }
        else if(req.body.email !== post.email){
            res.status(401).json('can only update your post')
        }else{
            await post.updateOne({$set:(req.body)})
            res.status(200).json("post updated")
            
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

// delete your post
router.delete('/:id',async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json('can only update your post')
        }
        else if(req.body.email !== post.email){
            res.status(403).json('can only update your post')
        }
        else{
            await post.deleteOne()
            res.status(200).json("post deleted successfully")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// like/dislike a post
router.put('/:id/likes', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // if the post has not be liked by the user
        if(!post){
            res.status(404).json('post not found')
        }
        else if (!post.likes.includes(req.body.email)) {
            // update it with 1 new like
            await post.updateOne({$push: {likes: req.body.email}})
            res.status(200).json('post liked')
        } else {
            // else remove that like
            await post.updateOne({$pull: {likes: req.body.email}})
            res.status(200).json('like removed')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// get post of following
router.get('/timeline/:email', async (req, res) => {
    try {
        const currentUser = await User.findOne({email :req.params.email});
        if(!currentUser) {
            res.status(404).json('user not found')
        }else{
            const userPosts = await Post.find({ email: currentUser.email });
            const friendPosts = await Post.find({ email: { $in: currentUser.following } });
            const timelinePosts = userPosts.concat(friendPosts);
            res.json(timelinePosts);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})



export default router