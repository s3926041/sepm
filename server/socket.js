// socket.js
const socketIO = require("socket.io");
const Match = require("./models/Match");

const initSocketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  const queueMatch = [];

  const chatUser = [];

  const addUser = (userId, socketId) => {
    !chatUser.some((user) => user.userId === userId) &&
      chatUser.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    chatUser = chatUser.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return chatUser.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("addChatUser", (userId) => {
      addUser(userId, socket.id);
      // io.emit("getUsers", users);
    });
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log(text);
      user?.socketId &&
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
    });

    socket.on("connectToQueue", () => {
      queueMatch.push({ socket });
      if (queueMatch.length >= 2) {
        const user1 = queueMatch.shift();
        const user2 = queueMatch.shift();

        const match = new Match({
          participants: [user1.socket.id, user2.socket.id],
          status: "available",
          conversation: [],
        });

        match.save((err) => {
          if (err) {
            console.error("Error creating match:", err);
          } else {
            io.to(user1.socket.id).emit("matchFound", { matchId: match._id });
            io.to(user2.socket.id).emit("matchFound", { matchId: match._id });
          }
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const index = queueMatch.findIndex((entry) => entry.socket === socket);
      if (index !== -1) {
        queueMatch.splice(index, 1);
      }
      removeUser(socket.id);
      // io.emit("getUsers", users);
    });
  });
};

module.exports = { initSocketServer };
