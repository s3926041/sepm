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

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinMatchRoom", (room) => {
      console.log("joined " + room);
      socket.join(room);
    });

    socket.on("sendMessage", async (data) => {
      console.log(data);
      try {
        const matchId = data.matchId;
        const match = await Match.findById(matchId);

        if (match) {
          const { sender, message } = data;
          match.conversation.push({ sender, message });
          await match.save();
          io.to(matchId).emit("messageReceived", { sender, message });
        }
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });

    socket.on("globalChatMessage", (message) => {
      console.log(message);
      io.emit("globalChatMessage", { user: socket.id, message });
    });

    socket.on("connectToQueue", (userid) => {
      queueMatch.push({ socket, userid });
      if (queueMatch.length >= 2) {
        const user1 = queueMatch.shift();
        const user2 = queueMatch.shift();

        const match = new Match({
          participants: [user1.userid, user2.userid],
          status: "available",
          conversation: [],
        });

        match.save((err) => {
          if (err) {
            console.error("Error creating match:", err);
          } else {
            io.to(user1.socket.id).emit("matchFound", { matchId: match._id });
            io.to(user2.socket.id).emit("matchFound", { matchId: match._id });

            // Join private chat room
            io.in(match._id).socketsJoin(match._id);
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

      // Leave private chat room on disconnect
      const rooms = io.sockets.adapter.rooms;
      for (const roomId in rooms) {
        if (rooms[roomId].sockets[socket.id]) {
          socket.leave(roomId);
        }
      }
    });
  });
};

module.exports = { initSocketServer };
