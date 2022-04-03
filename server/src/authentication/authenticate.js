const User = require("../models/User");

// If the user is found in db then put that user data in req
async function authenticate(req, res, next) {
  const { sessionId, username } = req.cookies;
  const user = await User.findOne({ sessionId, username });
  if (!user) {
    return next("403 - Bad Request");
  }

  req.user = user;
  next();
}

module.exports = authenticate;
