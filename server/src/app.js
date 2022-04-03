const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConfig");
const Gameslist = require("./routes/Gameslist");
const User = require("./routes/User");
const Search = require("./routes/Search");

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
app.use(Gameslist);
app.use(User);
app.use(Search);

// Very basic default error 
app.use((err, req, res, next) => {
  res.status(400);
  res.json({ err });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

dbConnect();

// const testRoute = require("./routes/Test");
// app.use(testRoute);
