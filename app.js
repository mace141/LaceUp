const express = require("express");
const app = express();
const db = require("./config/keys.js").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//parse json sent to frontend

// app.get("/", (req, res) => res.send("test1234"));
app.use("/api/users", users);
// //backend api/users route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
