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
  const teams = await Team.findById(req.params.id)
    .populate({ path: "player_id" })
    .populate("event_id");
  res.json(teams).catch((err) => res.status(404).json(err));
});

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newTeam = new Team({
      name: req.body.name,
      numPlayers: req.body.numPlayers,
      playersToFill: req.body.playersToFill,
      event_id: req.body.event_id,
    });
    
    newTeam
      .save()
      .then((team) => res.json(team))
      .catch((err) => res.status(404).json(err));
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
        // $push: { player_id: req.body.player_id },
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

router.put("/:id/addplayer", async (req, res) => {
  const team = await Team.findById(req.params.id);
  let player = await User.findById(req.body.player_id);
  // if (player && team.player_id.includes(player.id)) {
  if (team.player_id.includes(player.id)) {
    res.status(400).json("Player already on the team!");
  } else {
    team.player_id = team.player_id.concat(player);
    team.save().then((team) => {
      res.json(team);
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // passport.authenticate("jwt", { session: false }),
  await db.collection("teams").deleteOne({ _id: ObjectID(req.params.id) });
  res.json("deleted team");
});

module.exports = router;
