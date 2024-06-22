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
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.find();
        res.json(post);
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
// create a post
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.params.id;
    const { image, desc } = (req.body);
    try {
        const savedPost = yield Post_1.default.create({ userId: UserId, image: image, desc: desc });
        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// update a post
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findByIdAndUpdate(req.params.id);
        if (!post) {
            res.status(404).json('post not found');
        }
        else if (req.body.userId === post.userId) {
            yield post.updateOne({ $set: (req.body) });
            res.status(200).json("post updated: " + post);
        }
        else {
            res.status(401).json('can only update your post');
        }
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
// delete a post
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json('404 Not Found');
        }
        else if (req.body.userId === post.userId) {
            yield post.deleteOne({ $set: (req.body) });
            res.status(200).json("post deleted");
        }
        else {
            res.status(401).json('can only delete your post');
        }
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
// like/dislike a post
router.put('/:id/likes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        // if the post has not be liked by th user
        if (!post) {
            res.status(404).json('post not found');
        }
        else if (!post.likes.includes(req.body.userId)) {
            // update it with 1 new like
            yield post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('post liked');
        }
        else {
            // else remove that like
            yield post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('like removed');
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
// get a post
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json(error);
    }
}));
// get post of following
router.get('/timeline/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield User_1.default.findById(req.params.userId);
        if (!currentUser) {
            res.status(404).json('user not found');
        }
        else {
            const userPosts = yield Post_1.default.find({ userId: currentUser.id });
            const friendPosts = yield Post_1.default.find({ userId: { $in: currentUser.following } });
            const timelinePosts = userPosts.concat(friendPosts);
            res.json(timelinePosts);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// get your own posts
router.get('/profile/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.params.username });
        if (!user) {
            res.status(404).json('user not found');
        }
        else {
            const posts = yield Post_1.default.find({ userId: user._id });
            res.status(200).json(posts);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
