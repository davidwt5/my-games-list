const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const config = require("../../config");
const urlGenerator = require("../helpers/urlGenerator");

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
