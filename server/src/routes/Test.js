// Test routes that can be ignored

const express = require("express");
const router = express.Router();

router.get("/cookietest", (req, res) => {
  console.log(req.cookies);
  req.cookies ? res.send("Cookies Received") : res.send("No Cookies");
});

router.get("/usertest/:id", (req, res) => {
  (async () => console.log(await User.findById(req.params.id)))();
  res.send("see server console");
});

module.exports = router;
