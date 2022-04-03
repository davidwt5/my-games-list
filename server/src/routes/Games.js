const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const config = require("../../config");
const urlGenerator = require("../helpers/urlGenerator");
const UsersGameEntry = require("../models/UsersGameEntry");

// Returns a user on success. Returns null otherwise.
async function authenticate(sessionId, username) {
  return await User.findOne({ sessionId, username });
}

// Support default status if not supplied
// Ignore adding multiple times
router.post("/addgame", (req, res) => {
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
router.delete("/removegame/:gameId", (req, res) => {
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

router.get("/gameslist", (req, res) => {
  (async () => {
    const { sessionId, username } = req.cookies;
    const user = await authenticate(sessionId, username);
    if (!user) {
      res.status(403).send("Bad Credentials");
      return;
    }

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

// No need to authenticate user for search
// Verification on input length, etc. Sanitise user input for attacks?
router.get("/searchgames", (req, res) => {
  const title = req.query.title;
  (async () => {
    const url = urlGenerator({
      domain: "http://giantbomb.com/",
      endpoint: "api/search",
      queryStrings: {
        api_key: config.giantBomb.apiKey,
        format: "json",
        // field_list: "id,name,image",
        resources: "game",
        query: title,
        offset: 0,
        limit: 12,
      },
    });

    const response = await fetch(url);
    const result = await response.json();
    res.json(result);
  })();
});

module.exports = router;
