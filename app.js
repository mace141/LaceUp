const path = require('path');
const express = require("express");
const db = require("./config/keys.js").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const parks = require("./routes/api/parks");
const teams = require("./routes/api/teams");
const events = require("./routes/api/events");
const posts = require("./routes/api/posts");

const app = express();

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//parse json sent to frontend

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.get("/", (req, res) => res.send("LaceUp"));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/parks", parks);
app.use("/api/events", events);
app.use("/api/teams", teams);
app.use("/api/posts", posts);

// //backend api/users route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
