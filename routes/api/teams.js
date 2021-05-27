const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/User");
const { MongoClient, ObjectID } = require("mongodb");

const Team = require("../../models/Team");
const User = require("../../models/User");

const validateTeamInput = require("../../validation/teams");

router.get("/", (req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(404).json({ noteamsfound: "No teams found" }));
});

router.get("/:id", async (req, res) => {
  const teams = await Team.findById(req.params.id).populate(
    "player_id, event_id"
  );
  res.json(teams);
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
        errors.team = `A team already exists with the name ${team.name}`;
        return res.status(400).json(errors);
      } else {
        const newTeam = new Team({
          name: req.body.name,
          numPlayers: req.body.numPlayers,
          playersToFill: req.body.playersToFill,
          player_id: req.user.id,
          event_id: req.body.event_id,
        });
        newTeam
          .save()
          .then((team) => res.json(team))
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

router.patch(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateTeamInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }


    Team.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        numPlayers: req.body.numPlayers,
        playersToFill: req.body.playersToFill,
        $push: { player_id: req.body.player_id },
        event_id: req.body.event_id,
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
