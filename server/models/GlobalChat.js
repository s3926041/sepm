const mongoose = require("mongoose");

const globalChatschema = new mongoose.Schema({
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

const GlobalChat = mongoose.model("GlobalChat", globalChatschema);

module.exports = GlobalChat;
