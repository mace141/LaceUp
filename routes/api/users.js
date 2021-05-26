const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { db } = require("../../models/User");
const { MongoClient, ObjectID } = require("mongodb");

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
        // event_id: req.body.event_id,
        // team_id: req.body.team_id,
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
          // home_court: body.home_court.id,
          favorite_sports: user.favorite_sports,
          avatar: user.avatar,
          // event_id: user.event_id,
          // team_id: req.body.team_id,
          // post_id: req.body.team_id,
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

// router.put(
//   "/update/:id",
//   // passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { errors, isValid } = validateRegisterInput(req.body);

//     // if (!isValid) {
//     //   return res.status(400).json(errors);
//     // }

//     await db
//       .collection("users")
//       .replaceOne({ _id: ObjectID(req.params.id) }, req.body)

//     res.json('hitting database');
//     res.json("updated");
//   }
// );

router.put(
  "/update/:id",
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
        // home_court: body.home_court.id,
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

//** TEST ROUTE **

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
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) =>
      res.status(404).json({
        nouserfound: "No user found with that id",
      })
    );
});

//user events
// router.get("/:id/events", (req, res) => {
//   Event.find({ user_id: req.body.id })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res.status(404).json({
//         noeventsfound: "No events found for that user",
//       })
//     );
// });

module.exports = router;
