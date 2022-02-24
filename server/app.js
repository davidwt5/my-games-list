const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const User = require("./models/User");
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

// Returns a randomly generated Sesssion ID upon login
app.post("/login", (req, res) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  (async () => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }
    if (user.password !== hashedPassword) {
      res.status(403).send("Bad Credentials");
    } else {
      if (!user.sessionId) {
        user.sessionId = uuidv4();
        await user.save();
      }
      res.json({ sessionId: user.sessionId });
    }
  })();
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

const url =
  "mongodb+srv://admin:2HFu21TMxRp07uI5@cluster0.ozhyl.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(url);
