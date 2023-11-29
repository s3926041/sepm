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

    // Add user to the queue with their preferences
    const userPreferences = /* Retrieve or set user preferences */;
    queue.push({ socket, preferences: userPreferences });

    // Handle disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove the user from the queue if they are in it
      const index = queue.findIndex(entry => entry.socket === socket);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    });

    // Check for matches periodically
    setInterval(() => {
      for (let i = 0; i < queue.length - 1; i++) {
        const user1 = queue[i];
        
        for (let j = i + 1; j < queue.length; j++) {
          const user2 = queue[j];

          // Implement your matching logic based on preferences
          const matchScore = calculateMatchScore(user1.preferences, user2.preferences);

          // For example, if matchScore is above a certain threshold
          if (matchScore >= /* Some threshold */) {
            // Create a match with the matched users
            const match = new Match({
              participants: [user1.socket.id, user2.socket.id],
              status: "available",
              conversation: [],
            });

            match.save((err) => {
              if (err) {
                console.error("Error creating match:", err);
              } else {
                // Notify the users about the match
                io.to(user1.socket.id).emit("matchFound", { matchId: match._id });
                io.to(user2.socket.id).emit("matchFound", { matchId: match._id });

                // Remove the matched users from the queue
                queue.splice(j, 1);
                queue.splice(i, 1);
                i--; // Adjust i to account for the removed user1
                break; // Exit the inner loop
              }
            });
          }
        }
      }
    }, 5000);

    // Additional event handling goes here
  });
};

// Implement your matching scoring logic here
function calculateMatchScore(preferences1, preferences2) {
  // Example: Calculate match score based on preferences
  // Replace this with your own logic based on the structure of preferences
  return Object.keys(preferences1).reduce((score, key) => {
    if (preferences1[key] === preferences2[key]) {
      score++;
    }
    return score;
  }, 0);
}

module.exports = { initSocketServer };
