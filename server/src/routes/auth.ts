import {Router} from 'express'
import User from '../models/User'
import dotenv from 'dotenv'

dotenv.config()
const router = Router()

// const SECRET_KEY = process.env.SECRET_KEY

// // register user
// router.post("/register",async(req, res)=>{

//     try {
//         // generate password
//         const salt = await bycrypt.genSalt(10)
//         const hashedPassword = await bycrypt.hash(req.body.password, salt)
       
//         // generate new user
//         const newUser = await new User({
//             username: req.body.username,
//             password: hashedPassword,
//             email: req.body.email
//         })
    
//         // save user
//         const user = await newUser.save()
//         // response
//         res.status(200).json(user)
//     } catch (error) {
//         console.log(error);
//         res.status(500)
//         res.send('failed: ' + error)
//     }
    
// })


// // login user
// router.post('/login', async(req, res) => {
    
//     try {
//         const user = await User.findOne({email: req.body.email})
//         const password = await bycrypt.compare(req.body.password, user.password)
    
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (!password) {
//             return res.status(401).json({ message: 'Wrong password' });
//         }
    
//         const token = jwt.sign({user:user},SECRET_KEY,{expiresIn:'1hr'})

//         res.status(200).json(token)
//     } catch (error) {
//         res.status(500)
//         res.send('failed' + error)
//     }
// })

// // get user
// router.get('/getUser', async (req, res) => {
//     const users = await User.find()

//     res.send(users)
// })

export default router