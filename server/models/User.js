const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  username: {
    type: String,
    required: [true, "username is required"]
  },
  profilePic: String,
  sessionId: String
});

module.exports = mongoose.model("User", userSchema);
