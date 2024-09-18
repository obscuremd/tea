import {Router} from "express";
import Conversations from '../models/Conversations';

const router = Router()

// new conv
router.post('/',async(req,res)=>{

    const sender = req.body.senderUsername
    const receiver  = req.body.receiverUsername
    const conversations = await Conversations.findOne({
        members: { $all: [sender, receiver] }  // Use $all to check if both are members
    });

    if(!sender || !receiver){
        res.status(404).send('please enter sender username or receiver username')
    }
    else if(conversations){
        res.status(200).send("you've already started a conversation")
    }
    else{
        const newConversations = new Conversations({
            members: [sender, receiver]
        })
        try {
            const savedConversations = await newConversations.save()
            res.status(200).json(savedConversations)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
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