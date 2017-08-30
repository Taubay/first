// var Message   = require("../models/Message.js")

module.exports = function (io){
    io.sockets.on("connection" , function(socket){
        console.log("hello");
        
        socket.on("addUser" , function(data){
            console.log(data);
            socket.room = data.room ; 
            socket.userName = data.userName ; 
            socket.userImg = data.userImg ; 
            
            socket.join(data.room);
            socket.emit("updateChat" , "Server" , "You have joined to room1", "images/myuserava.png");// only for me 
            socket.broadcast.to(data.room).emit("updateChat" , "Server" , data.userName+" Has connected to the room" , "images/myuserava.png"); // everybody in this room exsept me 
        })
        
        socket.on("newMessage" , function(data){
            
            // new Message({}).save();
            console.log(data)
            io.sockets.in(socket.room).emit("updateChat" , socket.userName ,data.message , socket.userImg)
            
        })
        
        socket.on("changeRoom" , function(data){
            socket.broadcast.to(socket.room).emit("updateChat" , "Server" , socket.userName+" Has left this room" , "images/myuserava.png");
            socket.leave(socket.room);
            socket.room=data.room;
            socket.join(data.room);
            socket.emit("updateChat" , "Server" , "You have joined to " + data.room, "images/myuserava.png");// only for me 
            
            socket.broadcast.to(socket.room).emit("updateChat" , "Server" , socket.userName+" Has connected to this room" , "images/myuserava.png");
            
        })
    })
}