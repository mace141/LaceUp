const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/User");
const { MongoClient, ObjectID } = require("mongodb");

const Team = require("../../models/Team");

const validateTeamInput = require("../../validation/teams");

router.get("/", (req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(404).json({ noteamsfound: "No teams found" }));
});

router.get("/:id", (req, res) => {
  Team.findById(req.params.id)
    .then((team) => res.json(team))
    .catch((err) =>
      res.status(404).json({ noteamfound: "No team found with that id" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Team.findOne({ name: req.body.name }).then((team) => {
      if (team) {
        errors.team = "A team already exists with that name";
        return res.status(400).json(errors);
      } else {
        const newTeam = new Team({
          name: req.body.name,
          numPlayers: req.body.numPlayers,
          playersToFill: req.body.playersToFill,
          players_id: req.user.id,
          event_id: req.event.id,
        });
        newTeam.save().then((team) => res.json(team));
      }
    });
  }
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Team.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        numPlayers: req.body.numPlayers,
        playersToFill: req.body.playersToFill,
        players_id: req.user.id,
        event_id: req.event.id,
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

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("teams").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted team");
  }
);

module.exports = router;
