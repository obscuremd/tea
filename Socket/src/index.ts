import {Server} from 'socket.io'
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app)

const port = 8800

const io = new Server(server,{
    cors:{
        // origin: 'https://pinoy-eight.vercel.app',
        origin: 'http://localhost:5173',
        methods: ['GET','POST','HEAD','DELETE','UPDATE']
    }
})

let users: Array<{ username: string; socketId: string }> = [];

const addUser = (username: string, socketId: string) => {
  // Check if the user already exists in the users array
  !users.some((user) => user.username === username) && users.push({ username, socketId });
};

const removeUser = (socketId:string)=>{
    users.filter(user => user.socketId !== socketId)
}

const getUser = (username:string) =>{
    return users.find(user => user.username === username)
}

io.on('connection',(socket)=>{
    // when connected
    console.log('user connected', socket.id)
    
    // get user id and socket id
    socket.on("addUser",username =>{
        addUser(username, socket.id)
        io.emit('getUsers',users)
    })

    // send message
    socket.on("sendMessage",({senderName,receiverName,text})=>{
        const user = getUser(senderName)
        if(!user){
            return
        }else{
            io.to(user?.socketId).emit("getMessage",{
                senderName,text
            })
        }
    })

    // when disconnect
    socket.on("disconnect",()=>{
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers',users)
    })

})

server.listen(port,()=>{
    console.log(`listening on port https://localhost:${port}`)
})