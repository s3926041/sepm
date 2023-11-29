// socket.js
const socketIO = require("socket.io");
const Match = require('./models/Match');

const initSocketServer = () => {
  const io = socketIO(5002, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  const queue = [];
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    
    queue.push(socket);

    // Check for matches periodically
    setInterval(() => {
      if (queue.length >= 2) {
        // Create a match with the first two users in the queue
        const user1 = queue.shift();
        const user2 = queue.shift();

        // Create a new match in the database (use your Match model)
        const match = new Match({
          participants: [user1.id, user2.id],
          status: "available",
          conversation: [],
        });

        match.save((err) => {
          if (err) {
            console.error("Error creating match:", err);
          } else {
            // Notify the users about the match
            io.to(user1.id).emit("matchFound", { matchId: match._id });
            io.to(user2.id).emit("matchFound", { matchId: match._id });
          }
        });
      }
    }, 5000); 

    // Handle disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove the user from the queue if they are in it
      const index = queue.indexOf(socket);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    });

    // Additional event handling goes here
  });
};

module.exports = { initSocketServer };
