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

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateUpdateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // async
    // (req, res) => {
    // let user = await User.findById(req.params.id);
    // // let newAv;
    // profileImgUpload(req, res, (error) => {
    //   if (error) {
    //     console.log("errors", error);
    //     res.json({ error: error });
    //   } else {
    //     if (req.file === undefined) {
    //       res.json("No file selected!");
    //     }
    //   }
    //   // user.avatar = req.file.location
    //   // user.save().then(user => res.json(user))
    //   res.json(req.file.location).then((url) => {
    //     user.avatar = url;
    //     user.save();
    //   });
    //   // user.save().then(user => res.json(user))
    // });

    // const { errors, isValid } = validateUpdateInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

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
        // avatar: imageLocation,
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

// const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");
let AWS = require("../../config/keys_dev");

const profileImgUpload = multer({
  storage: multerS3({
    s3: AWS.s3,
    bucket: "ak-laceup-bucket",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// router.put("/:id/avatar", async(req, res) => {
//   profileImgUpload(req, res, (error) => {
//     if (error) {
//       console.log("errors", error);
//       res.json({ error: error });
//     } else {
//       // If File not found
//       if (req.file === undefined) {
//         console.log("Error: No File Selected!");
//         res.json("Error: No File Selected");
//       } else {
//         let user = User.findBy(req.params.id)

//         if (user.avatar) {
//           let currentAvatar = currentUser.avatar;
//           let newAvatar = req.file.location;
//           user.avatar = newAvatar
//         }  else {
//           let newAvatar = req.file.location;
//           user.avatar = newAvatar
//         }
//       }
//     }
//   }
//   )
// }
// )

// router.put("/:id/avatar", async (req, res) => {
//   let user = await User.findById(req.params.id);
//   profileImgUpload(req, res, (error) => {
//     if (error) {
//       console.log("errors", error);
//       res.json({ error: error });
//     } else {
//       if (req.file === undefined) {
//         res.json("No file selected!");
//         // } else {
//       }
//       let newAv = req.file.location;
//       user.avatar = newAv;
//       user
//         .save()
//         .then((user) => {
//           res.json(user);
//         })
//         .catch((e) => {
//           res.status(400).json(e);
//         });
//       // }
//     }
//   });
// });

// to add to update route

// passport.authenticate("jwt", { session: false }),
// async
// (req, res) => {
// let user = await User.findById(req.params.id);
// // let newAv;
// profileImgUpload(req, res, (error) => {
//   if (error) {
//     console.log("errors", error);
//     res.json({ error: error });
//   } else {
//     if (req.file === undefined) {
//       res.json("No file selected!");
//       }
//     }
//     user.avatar = req.file.location
//     user.save().then(user => res.json(user))
//   });

// const { errors, isValid } = validateUpdateInput(req.body);

// if (!isValid) {
//   return res.status(400).json(errors);
// }
module.exports = router;
