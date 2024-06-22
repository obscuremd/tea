import Post from '../models/Post'
import User from '../models/User'
import { Router } from 'express';


const router = Router()

router.get('/', async(req, res)=>{
    try {
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        res.status(404).send(error)
    }
})

// create a post
router.post('/:id',async(req, res)=>{
    const UserId = req.params.id
    const {image, desc} = (req.body)
    try {
        const savedPost = await Post.create({userId:UserId, image:image, desc:desc})
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a post
router.put('/:id',async(req, res)=>{

    try {
        
        const post = await Post.findByIdAndUpdate(req.params.id)

        if(!post){
            res.status(404).json('post not found')
        }
        else if(req.body.userId === post.userId){

            await post.updateOne({$set:(req.body)})
            
            res.status(200).json("post updated: " + post)
        }else{
            res.status(401).json('can only update your post')
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

// delete a post
router.delete('/:id',async(req, res)=>{

    try {
        
        const post = await Post.findByIdAndDelete(req.params.id)

        if(!post){
            res.status(404).json('404 Not Found')
        }
        else if(req.body.userId === post.userId){

            await post.deleteOne({$set:(req.body)})
            
            res.status(200).json("post deleted")
        }else{
            res.status(401).json('can only delete your post')
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

// like/dislike a post
router.put('/:id/likes', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // if the post has not be liked by th user
        if(!post){
            res.status(404).json('post not found')
        }
        else if (!post.likes.includes(req.body.userId)) {
            // update it with 1 new like
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('post liked')
        } else {
            // else remove that like
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json('like removed')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// get a post
router.get('/:id', async(req, res)=>{

    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})

// get post of following
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        if(!currentUser) {
            res.status(404).json('user not found')
        }else{
            const userPosts = await Post.find({ userId: currentUser.id });
            const friendPosts = await Post.find({ userId: { $in: currentUser.following } });
            const timelinePosts = userPosts.concat(friendPosts);
            res.json(timelinePosts);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// get your own posts
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({username:req.params.username})
        if(!user){
            res.status(404).json('user not found')
        }else{
            const posts = await Post.find({ userId : user._id})
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router