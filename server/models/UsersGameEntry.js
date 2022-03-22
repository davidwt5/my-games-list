const mongoose = require("mongoose");

const usersGameEntrySchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: [true, "gameId is required"]
  },
  status: {
    type: String,
    enum: ["playing", "completed", "on-hold", "dropped", "plan to play"],
    required: [true, "status is required"]
  }
});

module.exports = mongoose.model("usersGameEntry", usersGameEntrySchema);
