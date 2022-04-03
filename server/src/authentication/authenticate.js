const User = require("../models/User");

async function authenticate(req, res, next) {
  const { sessionId, username } = req.cookies;
  const user = await User.findOne({ sessionId, username });
  if (!user) {
    res.status(403).send("Bad Credentials");
    return next("router");
  }

  req.user = user;
  next();
}

module.exports = authenticate;
