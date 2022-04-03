const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConfig");
const Games = require("./routes/Games");
const User = require("./routes/User");

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
app.use(Games);
app.use(User);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

dbConnect();

// const testRoute = require("./routes/Test");
// app.use(testRoute);
