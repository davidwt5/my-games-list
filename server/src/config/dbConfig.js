const mongoose = require("mongoose");
const config = require("../../config");

function dbConnect() {
  const url = `mongodb+srv://${config.mongo.username}:${config.mongo.password}@cluster0.ozhyl.mongodb.net/db?retryWrites=true&w=majority`;
  mongoose.connect(url);
}

module.exports = dbConnect;
