const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["available", "rejected", "accepted"],
    default: "available",
  },
  conversation: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
