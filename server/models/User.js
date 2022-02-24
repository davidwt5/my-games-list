const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
  },
  sessionId: String
});

module.exports = mongoose.model("User", userSchema);
