const express = require("express");
const app = express();
const db = require("./config/keys.js").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");


const users = require('./routes/api/users')
const parks = require('./routes/api/parks')
const events = require("./routes/api/events");
<<<<<<< HEAD
<<<<<<< HEAD
const teams = require("./routes/api/teams")
=======
const posts = require('./routes/api/posts');
>>>>>>> posts
=======
const posts = require('./routes/api/posts');
const teams = require("./routes/api/teams")
>>>>>>> 46ec7e58d3b3545cb9c4567fde4f5410e2c7c548

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//parse json sent to frontend


app.get("/", (req, res) => res.send("LaceUp"))

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/parks", parks);
app.use("/api/events", events);
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/api/teams", teams)

=======
app.use("/api/posts", posts);
>>>>>>> posts
=======
app.use("/api/posts", posts);
app.use("/api/teams", teams)

>>>>>>> 46ec7e58d3b3545cb9c4567fde4f5410e2c7c548
// //backend api/users route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
