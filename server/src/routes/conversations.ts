import {Router} from "express";
import Conversations from '../models/Conversations';

const router = Router()

// new conv
router.post('/',async(req,res)=>{
    try {
        const newConversations = new Conversations({
            members: [req.body.senderUsername, req.body.receiverUsername]
        })
        const savedConversations = await newConversations.save()
        res.status(200).json(savedConversations)
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

router.get('/:username',async(req,res)=>{
    try {
        const conversation = await Conversations.find({
            members:{$in:[req.params.username]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        
    }
})


export default router