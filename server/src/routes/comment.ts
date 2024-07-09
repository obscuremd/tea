import {Router} from "express";
import Comment from "../models/Comment";
import User from "../models/User";
import Posts from "../models/Post";

const router = Router()

// create comment
router.post('/:id',async(req, res) =>{

    const post = await Posts.findById(req.params.id)

    try {
        const newComment = new Comment ({
            postId: req.params.id,
            text: req.body.text,
            email: req.body.email,
        })

        const savedComment = await newComment.save()
        await post?.updateOne({$push:{comments: savedComment._id}})

        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

// get post comments
router.get('/:id',async(req, res) =>{
    const postId = req.params.id
    try {
        const comment = await Comment.find()
        if(!comment){
            res.status(404).json('comment not found')
        }
        else {
            res.status(200).json(comment. filter(comment => comment.postId === postId) )
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
// get all comments
router.get('/',async(req, res) =>{
    try {
        const comment = await Comment.find()
        if(!comment){
            res.status(404).json('comment not found')
        }
        else {
            res.status(200).json(comment)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async(req, res) =>{
    const post = await Posts.findById(req.body.postId)
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            res.status(404).json('comment not found')
        }
        else if (comment.email === req.body.email) {
            post?.updateOne({pull:{comment:comment.id}})
            comment.deleteOne()
            res.status(200).json('comment deleted') 
        } else {
            res.status(500).json('you can only delete your comment')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router