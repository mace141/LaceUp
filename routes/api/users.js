const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users route" }));


//register
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user alredy exists with this email." });
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
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if(!user) {
            return res.status(404).json({email: 'Cannot find a user with that email address'});
        }

        // match stored password digest to input password
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                res.json({ msg: "Success"});
            } else {
                return res.status(400).json({password: "Invalid password"})
            }
        })
    })
});



module.exports = router;
