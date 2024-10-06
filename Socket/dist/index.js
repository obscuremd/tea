"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = 8800;
const io = new socket_io_1.Server(server, {
    cors: {
        // origin: 'https://pinoy-eight.vercel.app',
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'HEAD', 'DELETE', 'UPDATE']
    }
});
let users = [];
const addUser = (username, socketId) => {
    // Check if the user already exists in the users array
    !users.some((user) => user.username === username) && users.push({ username, socketId });
};
const removeUser = (socketId) => {
    users.filter(user => user.socketId !== socketId);
};
const getUser = (username) => {
    return users.find(user => user.username === username);
};
io.on('connection', (socket) => {
    // when connected
    console.log('user connected', socket.id);
    // get user id and socket id
    socket.on("addUser", username => {
        addUser(username, socket.id);
        io.emit('getUsers', users);
    });
    // send message
    socket.on("sendMessage", ({ senderName, receiverName, text }) => {
        const user = getUser(senderName);
        if (!user) {
            return;
        }
        else {
            io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("getMessage", {
                senderName, text
            });
        }
    });
    // when disconnect
    socket.on("disconnect", () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
server.listen(port, () => {
    console.log(`listening on port https://localhost:${port}`);
});
