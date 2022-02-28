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
  firstName: {
    type: String,
    required: [true, "first name is required"]
  },
  lastName: {
    type: String,
    required: [true, "last name is required"]
  },
  profilePic: String,
  sessionId: String
});

module.exports = mongoose.model("User", userSchema);
