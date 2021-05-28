const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/Event");

const Event = require("../../models/Event");
const Team = require("../../models/Team");
const User = require("../../models/User");

const validateEventInput = require("../../validation/event");
const { MongoClient, ObjectID } = require("mongodb");

router.post(
  "/create",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEventInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
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


router.get("/park/:location_id", (req, res) => {
  Event.find({ location_id: req.params.location_id })
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) =>
      res
        .status(404)
        .json({ noeventsfound: "No events found for that location" })
    );
});
// router.get("/", (req, res) => {
//   Event.find()
//     .sort({ date: -1 })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res.status(404).json({ noteventsfound: "No events found" })
//     );
// });

router.get("/", async (req, res) => {
  const events = await Event.find()
    .populate("team_id")
    .populate("location_id")
    .populate("user_id")
    .catch((err) => res.status(404).json(err));
  res.json(events);
});


router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("team_id")
    .populate("location_id")
    .populate("user_id")
    .catch((err) => res.status(404).json(err));
  res.json(event);
});

router.patch(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEventInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
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
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("events").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);

module.exports = router;
