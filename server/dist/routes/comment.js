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
const express_1 = require("express");
const Comment_1 = __importDefault(require("../models/Comment"));
const router = (0, express_1.Router)();
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = new Comment_1.default({
            postId: req.params.id,
            text: req.body.text,
            userId: req.body.userId,
        });
        const savedComment = yield newComment.save();
        res.status(200).json('comment saved' + savedComment);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        if (!comment) {
            res.status(404).json('comment not found');
        }
        else if (comment.postId === req.body.postId) {
            res.status(200).json(comment);
        }
        else {
            res.status(500).json('comment not found');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        if (!comment) {
            res.status(404).json('comment not found');
        }
        else if (comment.userId === req.body.userId) {
            res.status(200).json('comment deleted');
        }
        else {
            res.status(500).json('you can only delete your comment');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
