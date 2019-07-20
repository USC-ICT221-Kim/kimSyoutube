import "./Models/Video";
import "./Models/Comment";
import "./Models/User";

import SocketIO from "socket.io";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();



const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
const handlelistening = () => console.log(`✅ Listening on: http://localhost:4000`);

const server = app.listen(PORT, handlelistening);

const io = SocketIO.listen(server);

io.on("connection", socket =>{
    socket.on("newMessage", ({message}) => {
        socket.broadcast.emit("MessageNotification", 
        { message, 
            nickname:socket.nickname || "Unknoen"
        
         });
    });
    socket.on("setNickName", ({nickname}) =>{
        socket.nickname = nickname;
    })
});
