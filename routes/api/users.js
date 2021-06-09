const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { db } = require("../../models/User");
const { MongoClient, ObjectID } = require("mongodb");
const upload = require("../../image_upload/image_upload");
const deleteImage = require("../../image_upload/image_delete");

const User = require("../../models/User");
const Event = require("../../models/Event");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateUpdateInput = require("../../validation/update");

//register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "A user is already registered with that email";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        home_court: req.body.home_court,
        favorite_sports: req.body.favorite_sports,
        avatar: req.body.avatar,
        event_id: req.body.event_id,
        team_id: req.body.team_id,

        // post_id: req.body.team_id
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hashed) => {
          if (err) throw err;
          newUser.password = hashed;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//login

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "Cannot find a user with that email address";
      return res.status(404).json(errors);
    }

    // match stored password digest to input password
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const payload = {
          id: user.id,
          username: user.username,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          bio: user.bio,
          home_court: user.home_court,
          favorite_sports: user.favorite_sports,
          avatar: user.avatar,
          event_id: user.event_id,
          team_id: req.body.team_id,
          post_id: req.body.post_id,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 1800 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("users").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateUpdateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        bio: req.body.bio,
        home_court: req.body.home_court,
        favorite_sports: req.body.favorite_sports,
        avatar: req.body.avatar,
      },
      { new: true },
      function (err, result) {
        if (err) {
          res.json(err);
        }
        res.json(result);
      }
    );
  }
);


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      msg: "Persits",
    });
  }
);

router.get("/:id", (req, res) => {
  let user = User.findById(req.params.id);
  let userEvents = Event.find({ user_id: req.params.id });
  let userTeams = Team.find({ player_id: req.params.id });
  let userPosts = Post.find({ user_id: req.params.id });
  Promise.all([user, userEvents, userTeams])
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json(err));
});

router.post("/:id/image", upload.single("image"), async (req, res) => {
  const currentUser = await User.findById(req.params.id);
  if (currentUser.avatar) {
    let imageUrl = currentUser.avatar;
    let bucket = imageUrl.split("/")[2].split(".")[0];
    let key = imageUrl.split("/")[3];
    deleteImage(bucket, key)
  }

  currentUser.avatar = req.file.location;
  currentUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.status(400).json(err);
    });
});

module.exports = router;
