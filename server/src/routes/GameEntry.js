const express = require("express");
const router = express.Router();
const authenticate = require("../authentication/authenticate");

router.use("/gameentry", authenticate);

router.route("/gameentry").put((req, res) => {
  (async () => {
    const user = req.user;
    const gameEntry = user.gamesList.find(
      (entry) => entry.gameId === req.body.gameId
    );
    try {
      gameEntry.status = req.body.status;
    } catch {
      console.log("invalid status");
      res.sendStatus("400");
      return;
    }

    await user.save();
    res.sendStatus("200");
  })();
});

module.exports = router;
