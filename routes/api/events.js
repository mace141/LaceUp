const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/Event");

const Event = require("../../models/Event");
const Team = require("../../models/Team");
const User = require("../../models/User");
const Post = require("../../models/Post");

const validateEventInput = require("../../validation/event");
const { MongoClient, ObjectID } = require("mongodb");

//create event
router.post(
  "/create",

  (req, res) => {
    const newEvent = new Event({
      location_id: req.body.location_id,
      user_id: req.body.user_id,
      team_id: req.body.team_id,
      date: req.body.date,
      sport: req.body.sport,
      skill: req.body.skill,
      type: req.body.type,
      team_size: req.body.team_size,
      num_teams: req.body.num_teams,
    });

    newEvent.save().then((event) => res.json(event));
  }
);

//event by park
router.get("/park/:location_id", async (req, res) => {
  let events = await Event.find({ location_id: req.params.location_id });
  let currentEvents = [];
  events.forEach((event) => {
    if (event.date.toISOString() >= new Date().toISOString()) {
      currentEvents.push(event);
    }
  });
  res.json(currentEvents).catch((e) => res.status(404).json(e));
  // .sort({ date: -1 })
  // .then((events) => res.json(events))
  // .catch((err) => res.status(404).json(err));
});

//index events
router.get("/", async (req, res) => {
  const events = await Event.find()
    .populate("team_id")
    .populate("location_id")
    .populate("user_id")
    .catch((err) => res.status(404).json(err));

  const currentEvents = [];
  events.forEach((event) => {
    if (event.date.toISOString() >= new Date().toISOString())
      currentEvents.push(event);
  });
  res.json(currentEvents);
});

//show event
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("team_id")
    .populate("location_id")
    .populate("user_id")
    .catch((err) => res.status(404).json(err));
  res.json(event);
});

//show event posts
router.get("/:id/posts", async (req, res) => {
  await Post.find({ event_id: req.params.id })
    .populate("user_id")
    .then((posts) => res.json(posts))
    .catch((e) => res.status(404).json(e));
});

//update event
router.patch(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
  //   const { errors, isValid } = validateEventInput(req.body);
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
    Event.findByIdAndUpdate(
      { _id: req.params.id },
      {
        location_id: req.body.location_id,
        // $push: { team_id: req.body.team_id },
        date: req.body.date,
        sport: req.body.sport,
        skill: req.body.skill,
        type: req.body.type,
        team_size: req.body.team_size,
        num_teams: req.body.num_teams,
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

//add team to event
router.put("/:id/addteam", async (req, res) => {
  let event = await Event.findById(req.params.id);
  let team = await Team.findById(req.body.team_id);
  if (event.team_id.includes(team.id)) {
    res.status(400).json("Team already in event");
  } else {
    event.team_id = event.team_id.concat(team);
    event.save().then((event) => {
      res.json(event);
    });
  }
});
router.delete(
  "/delete/:id",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("events").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);

module.exports = router;
