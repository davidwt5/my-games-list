const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const config = require("../../config");
const urlGenerator = require("../helpers/urlGenerator");
const UsersGameEntry = require("../models/UsersGameEntry");
const authenticate = require("../authentication/authenticate");

// Support default status if not supplied
// Ignore adding multiple times
router.post("/addgame", authenticate, (req, res) => {
  (async () => {
    const user = req.user;

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
router.delete("/removegame/:gameId", authenticate, (req, res) => {
  (async () => {
    const user = req.user;

    // Find index of the game to be deleted
    const index = user.gamesList.findIndex(
      (entry) => entry.gameId === req.params.gameId
    );
    if (index > -1) user.gamesList.splice(index, 1);
    await user.save();
    res.sendStatus(200);
  })();
});

router.get("/gameslist", authenticate, (req, res) => {
  (async () => {
    const user = req.user;

    const gameIds = user.gamesList.map((entry) => entry.gameId).join("|");
    const url = urlGenerator({
      domain: "https://giantbomb.com/",
      endpoint: "api/games",
      queryStrings: {
        api_key: config.giantBomb.apiKey,
        format: "json",
        field_list: "id,name,image",
        filter: `id:${gameIds}`,
        offset: 0,
        limit: 12,
      },
    });
    const response = await fetch(url);
    const result = await response.json();

    // Converts the user model into a plain object. This is so we can add a game data field
    // that's fetched from giantbomb. This field isn't defined in the database model and hence
    // We can't add it in to a model object.
    const plainObjUser = user.toObject();
    for (let i = 0; i < plainObjUser.gamesList.length; i++) {
      plainObjUser.gamesList[i].game = result.results[i];
    }

    res.json(plainObjUser.gamesList);
  })();
});

module.exports = router;
