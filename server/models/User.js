const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female","none"],
      default: "none",
    },
    // avatarImg: {
    //   data: Buffer,
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
