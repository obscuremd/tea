"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// update user
// router.put('/:id',async(req, res)=>{
//     if(req.body.userId === req.params.id || req.body.isAdmin){
//         // update password
//         if(req.body.password){
//             try{
//                 const salt = await bcrypt.genSalt(10)
//                 req.body.password = await bcrypt.hash(req.body.password, salt)
//             }catch(err){
//                 return res.status(400).json(err)
//             }
//         }
//         // update user
//         try {
//             const user = await User.findByIdAndUpdate(req.params.id,{
//                 $set: req.body
//             })
//             res.status(200).json('user updated: '+user)
//         } catch (error) {
//             return res.send('failed: ' + error)
//         }
//     }else{
//         return res.status(403).json('you can only update your account')
//     }
// })
// delete user
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // delete user
        try {
            const user = yield User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json('account deleted');
        }
        catch (error) {
            return res.send('failed: ' + error);
        }
    }
    else {
        return res.status(403).json('you can only delete your account');
    }
}));
// get 1 user
// router.get('/',async(req, res)=>{
//     const userId = req.query.userId
//     const username = req.query.username
//         // get user
//         try {
//             const user = userId 
//                 ? await User.findById(userId) 
//                 : await User.findOne({username: username})
//             !user && res.status(404).json('User not found');  // Set appropriate status code and message
//             const {password, updatedAt, ...other} = user._doc
//             res.status(200).json(other)
//         } catch (error) {
//             return res.send('failed: ' + error)
//         }
// })
// follow user
// router.put('/:id/follow', async(req, res)=>{
//     const UserId = req.params.id
//     const OtherUserId = req.body.userId
//     // checking if the user is yourself
//     if(UserId !== OtherUserId){
//         try {
//             // find yourself
//             const currentUser = await User.findById(UserId)  
//             // find other user
//             const OtherUser = await User.findById(OtherUserId)
//         // check if your already following the user
//         if(!currentUser.following.includes(OtherUserId)){
//             await OtherUser.updateOne({$push:{followers: UserId}})
//             await currentUser.updateOne({$push:{following: OtherUserId}})
//             res.status(200).json("user followed")
//         } else{
//             res.status(403).json('you already follow this user')
//         }
//         } catch (error) {
//             res.status(500).json('error: ' + error)
//         }
//         // if you're the same you get this error
//     }else{
//         res.status(403).json('you cant follow yourself')
//     }
// })
// unfollow user
// router.put('/:id/unfollow', async(req, res)=>{
//     const UserId = req.params.id
//     const OtherUserId = req.body.userId
//     // checking if the user is yourself
//     if(UserId !== OtherUserId){
//         try {
//             // find yourself
//             const currentUser = await User.findById(UserId)  
//             // find other user
//             const OtherUser = await User.findById(OtherUserId)
//         // check if your already following the user
//         if(currentUser.following.includes(OtherUserId)){
//             await OtherUser.updateOne({$pull:{followers: UserId}})
//             await currentUser.updateOne({$pull:{following: OtherUserId}})
//             res.status(200).json("user unfollowed")
//         } else{
//             res.status(403).json("you don't follow this user")
//         }
//         } catch (error) {
//             res.status(500).json('error: ' + error)
//         }
//         // if you're the same you get this error
//     }else{
//         res.status(403).json('you cant unfollow yourself')
//     }
// })
exports.default = router;
