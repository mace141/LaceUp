const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { db } = require("../../models/User");
const { MongoClient, ObjectID } = require("mongodb");

const Team = require("../../models/Team");
const User = require("../../models/User");

const validateTeamInput = require("../../validation/teams");

//team index
router.get("/", (req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(404).json({ noteamsfound: "No teams found" }));
});

//team show
router.get("/:id", async (req, res) => {
  const teams = await Team.findById(req.params.id)
    .populate({ path: "player_id" })
    .populate("event_id");
  res.json(teams).catch((err) => res.status(404).json(err));
});

//team post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
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


//team update
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Team.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        numPlayers: req.body.numPlayers,
        playersToFill: req.body.playersToFill,
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

//team add_player
router.put(
  "/:id/addplayer",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const team = await Team.findById(req.params.id);
    let player = await User.findById(req.body.player_id);
    if (team.player_id.includes(player.id)) {
      res.status(400).json("Player already on the team!");
    } else {
      team.player_id = team.player_id.concat(player);
      team.save().then((team) => {
        res.json(team);
      });
    }
  }
);

//team remove_player
router.put(
  "/:id/removeplayer",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const team = await Team.findById(req.params.id);
    let player = await User.findById(req.body.player_id);
    if (team.player_id.includes(player.id)) {
      team.player_id.splice(team.player_id, 1);
      res.json(team);
    } else {
      res.status(400).json("Player is not on the team!");
    }
  }
);


//remove team
router.delete("/delete/:id", async (req, res) => {
  passport.authenticate("jwt", { session: false }),
    await db.collection("teams").deleteOne({ _id: ObjectID(req.params.id) });
  res.json("deleted team");
});

module.exports = router;
