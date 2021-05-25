const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

const Event = require('../../models/Event'); 
const validateEventInput = require('../../validation/event');

router.get("/test", (req, res) => res.json({ msg: "Events route" }));

router.post('/create', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEventInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newEvent = new Event({
            location_id: req.body.location_id,
            user_id: req.user.id,
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

router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(404).json({ noteventsfound: 'No events found' }));
});

router.get('/user/:user_id', (req, res) => {
    Event.find({ user_id: req.params.user_id })
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err =>
            res.status(404).json({ noeventsfound: 'No events found for that user' }
            )
        );
});

router.get('/team/:teams_id', (req, res) => {
    Event.find({ teams_id: req.params.teams_id})
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err =>
            res.status(404).json({ noeventsfound: 'No events found for that team' }
            )
        );
});

router.get('/park/:location_id', (req, res) => {
    Event.find({ location_id: req.params.location_id })
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err =>
            res.status(404).json({ noeventsfound: 'No events found for that location' }
            )
        );
});

// router.patch('/edit/:id', (req, res) => {

//     Event.findById(req.params.id, function (err, p) {
//         if (!p)
//             return next(new Error('Unable to edit this event'));
//         else {
//             // do your updates here
//             p.modified = new Date();

//             p.save(function (err) {
//                 if (err)
//                     console.log('error')
//                 else
//                     console.log('success')
    
//         });
//     }
// });



module.exports = router;