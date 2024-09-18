import {Router} from "express";
import Message from "../models/Messages";

const router = Router()

router.post('/',async(req, res) => {
    try {
        const message = new Message(req.body)
        const savedMessage = await message.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:conversationId',async(req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router