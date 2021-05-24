const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Event = require('../../models/Event'); 
// const validateEventInput = require('../../validation/event');

router.get("/test", (req, res) => res.json({ msg: "Events route" }));

router.post('/create', (req, res) => {
    
    // const { errors, isValid} = validateEventInput(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

        const newEvent = new Event({
            location_id: req.body.location_id,
            user_id: req.body.user_id,
            teams_id: req.body.teams_id,
            date: req.body.date,
            sport: req.body.sport,
            skill: req.body.skill,
            type: req.body.type,
            team_size: req.body.team_size,
            num_teams: req.body.num_teams,
        });

        newEvent.save().then(event => res.json(event));
    }
);

module.exports = router;