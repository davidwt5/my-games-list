const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  res.json({
    email: req.body.email,
    password: req.body.password
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
