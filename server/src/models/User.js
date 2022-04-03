const mongoose = require("mongoose");
const usersGameEntry = require("./UsersGameEntry");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"]
  },
  sessionId: {
    type: String,
    unique: true
  },
  gamesList: {
    type: [usersGameEntry.schema]
  },
  profilePic: String,
});

module.exports = mongoose.model("User", userSchema);
