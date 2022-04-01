const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const User = require("./models/User");
const UsersGameEntry = require("./models/UsersGameEntry");
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

// Returns a user on success. Returns null otherwise.
async function authenticate(sessionId, username) {
  return await User.findOne({ sessionId, username });
}

// Returns a randomly generated Sesssion ID upon login
// Regenerate sessionID if one is already in use (db returns error if sessionID is not unique)
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

// DB returns error if email and/or username is not unique. Fix it.
// Regenerate UUID if sessionID is already in use (just like login)
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

// Support default status if not supplied
// Ignore adding multiple times
app.post("/addgame", (req, res) => {
  (async () => {
    const { sessionId, username } = req.cookies;
    const user = await authenticate(sessionId, username);
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }

    // Sometimes req.body would be empty here, causing an error... I don't know why??
    const gameEntry = new UsersGameEntry({
      gameId: req.body.gameId,
      status: "plan to play",
    });

    // Ignores the request to add if said game already exists in the list
    if (user.gamesList.find((entry) => entry.gameId === gameEntry.gameId)) {
      console.log("duplicate game");
      res.sendStatus(200);
      return;
    }
    user.gamesList.push(gameEntry);
    await user.save();
    res.sendStatus(200);
  })();
});

// If the game to be deleted can't be found, simply ignore
app.delete("/removegame/:gameId", (req, res) => {
  (async () => {
    const { sessionId, username } = req.cookies;
    const user = await authenticate(sessionId, username);
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }

    // Find index of the game to be deleted
    const index = user.gamesList.findIndex(
      (entry) => entry.gameId === req.params.gameId
    );
    if (index > -1) user.gamesList.splice(index, 1);
    await user.save();
    res.sendStatus(200);
  })();
});

app.get("/gameslist", (req, res) => {
  (async () => {
    const { sessionId, username } = req.cookies;
    const user = await authenticate(sessionId, username);
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }

    res.json(user.gamesList);
  })();
});

app.get("/cookietest", (req, res) => {
  console.log(req.cookies);
  req.cookies ? res.send("Cookies Received") : res.send("No Cookies");
});

app.get("/usertest/:id", (req, res) => {
  (async () => console.log(await User.findById(req.params.id)))();
  res.send("see server console");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

const url = `mongodb+srv://admin:${config.dbPassword}@cluster0.ozhyl.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(url);
