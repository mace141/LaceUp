const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/Post");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const { MongoClient, ObjectID } = require("mongodb");


//create post on event
router.post(
  "/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      event_id: req.params.event_id,
      user_id: req.body.user_id,
      text: req.body.text,
    });
    newPost.save().then((post) => res.json(post));
  }
);


// get posts
router.get("/", async (req, res) => {
  let posts = await Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json(err));
});

//update post
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        text: req.body.text,
      },
      { new: true },
      function (e, result) {
        if (e) {
          res.json(e);
        }
        res.json(result);
      }
    );
  }
);


//delete post
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("posts").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);

module.exports = router;
