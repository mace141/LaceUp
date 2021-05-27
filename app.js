const express = require("express");
const db = require("./config/keys.js").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const multiparty = require("multiparty");

const users = require("./routes/api/users");
const parks = require("./routes/api/parks");
const teams = require("./routes/api/teams");
const events = require("./routes/api/events");
const posts = require("./routes/api/posts");

const app = express();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// const s3 = new AWS.S3();

// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: "public-read",
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`,
//   };
//   return s3.upload(params).promise();
// };
// app.post("/test-upload", (request, response) => {
//   const form = new multiparty.Form();
//   form.parse(request, async (error, fields, files) => {
//     if (error) {
//       return response.status(500).send(error);
//     }
//     try {
//       const path = files.file[0].path;
//       const buffer = fs.readFileSync(path);
//       const type = await FileType.fromBuffer(buffer);
//       const fileName = `bucketFolder/${Date.now().toString()}`;
//       const data = await uploadFile(buffer, fileName, type);
//       return response.status(200).send(data);
//     } catch (err) {
//       return response.status(500).send(err);
//     }
//   });
// });


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//parse json sent to frontend

app.get("/", (req, res) => res.send("LaceUp"));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/parks", parks);
app.use("/api/events", events);
app.use("/api/teams", teams);

// //backend api/users route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
