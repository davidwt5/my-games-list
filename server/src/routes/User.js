const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const User = require("../models/User");

// Returns a randomly generated Sesssion ID upon login
// Regenerate sessionID if one is already in use (db returns error if sessionID is not unique)
router.post("/login", (req, res) => {
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
router.post("/signup", (req, res) => {
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

module.exports = router;
