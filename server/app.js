const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const config = require("./config");
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// Returns a randomly generated Sesssion ID upon login
app.post("/login", (req, res) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  (async () => {
    const user = await User.findOne({ email: req.body.email });
    // Validate that the user exists
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }
    // Validate that passwords match
    if (user.password !== hashedPassword) {
      res.status(403).send("Bad Credentials");
    }
    // Create a sessionId if it doesn't exist, and returns it
    else {
      if (!user.sessionId) {
        user.sessionId = uuidv4();
        await user.save();
      }
      // Register sessionId in the browser cookies. Secure? HTTP Only? Expiry?
      // Is it vulnerable to cross site cookies, but its not really sensitive information right?
      // Basic information stored in cookies to avoid db look up for common insensitive information
      res.cookie("sessionId", user.sessionId);
      res.cookie("username", user.username);
      if (user.profilePic) res.cookie("profilePic", user.profilePic);
      res.sendStatus(200);
    }
  })();
});

app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  (async () => {
    // Inserting new user to db
    const user = new User({ email, username, password: hashedPassword });
    user.sessionId = uuidv4();
    await user.save();
    // Setting up session
    res.cookie("sessionId", user.sessionId);
    res.cookie("username", user.username);
    res.sendStatus(200);
  })();
});

app.get("/cookietest", (req, res) => {
  console.log(req.cookies);
  req.cookies ? res.send("Cookies Received") : res.send("No Cookies");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

const url = `mongodb+srv://admin:${config.dbPassword}@cluster0.ozhyl.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(url);
