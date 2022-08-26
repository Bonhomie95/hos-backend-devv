const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users:any = [];
  
  const addUser = (userId:any, socketId:any) => {
    !users.some((user:any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId:any) => {
    users = users.filter((user:any) => user.socketId !== socketId);
  };
  
  const getUser = (userId:any) => {
    return users.find((user:any) => user.userId === userId);
  };
  
  io.on("connection", (socket:any) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId:any) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }:any) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  