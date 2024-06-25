import User from '../models/User'
import { Router } from 'express';

const router = Router()

// create user
router.post('/register', async(req, res) => {
    const {username, fullName, email, profilePicture, coverPicture, location, gender}=req.body

    try {
        const user = await User.create({username, fullName, email, profilePicture, coverPicture, location, gender})
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})

// get user
router.get('/:email', async (req, res) => {
    
        try {
            const user = await User.findOne({ email: req.params.email})
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
})

// update user
router.put('/:email',async(req, res)=>{

    if(req.body.email === req.params.email){
        try {
            await User.findOneAndUpdate({email: req.body.email},{$set:req.body})
            res.status(200).json('user updated successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('you can only update your account')
    }
})

// delete user
router.delete('/:email',async(req, res)=>{
    if(req.body.email === req.params.email){
        // delete user
        try {
            await User.findOneAndDelete({email : req.params.email})
            res.status(200).json('account deleted')
        } catch (error) {
            return res.send('failed: ' + error)
        }

    }else{
        return res.status(403).json('you can only delete your account')
    }
})

// follow user 
router.put('/follow/:email',async(req, res) => {

    if(!req.params.email || ! req.body.email) {
        res.status(404).json('please provide both usernames')
    }
    else if(req.params.email === req.body.email){
        res.status(404).json('you cant follow/unfollow yourself')
    }
    else{
        // find users
        const yourAccount = await User.findOne({email:req.params.email}) 
        const otherAccount = await User.findOne({email:req.body.email}) 
        
        // unFollow
        if(yourAccount?.following.includes(otherAccount?.email)){
            try {
                await yourAccount.updateOne({$pull:{following:otherAccount?.email}})
                await otherAccount?.updateOne({$pull:{followers:yourAccount?.email}})
                res.status(200).json('user unfollowed')
            } catch (error) {
                res.status(500).json(500)
            }
        }
        // follow
        else{
            try {
                await yourAccount?.updateOne({$push:{following:otherAccount?.email}})
                await otherAccount?.updateOne({$push:{followers:yourAccount?.email}})
                res.status(200).json('user followed')
            } catch (error) {
                res.status(500).json(500)
            }
        }
    }
})

export default router