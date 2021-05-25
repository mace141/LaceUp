const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport")

const Team = require("../../models/Team");

const validateTeamInput = require("../../validation/teams");

router.get("/test", (req, res) => {
  res.json({ msg: "Team test" });
});

router.get("/", (req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(404).json({ noteamsfound: "No teams found" }));
});

router.get("/:id", (req, res) => {
    Team.findById(req.params.id).then( par => res.json(park)).catch(err => res.status(404).json({ noteamfound: "No team found with that id"}))
})

router.post("/", passport.authenticate("jwt", { session: false}), (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTeam = new Team({
        name: req.body.name,
        numPlayers: req.body.numPlayers,
        playersToFill: req.body.playersToFill,
        // players: req.body.players,
        // event: red.body.event.id
    })
})

module.exports = router;
