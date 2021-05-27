// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");
// const { db } = require("../../models/Event");

// const Event = require("../../models/Event");
// const validateEventInput = require("../../validation/event");
// const { MongoClient, ObjectID } = require("mongodb");

// router.get("/test", (req, res) => res.json({ msg: "Events route" }));

// //quick access post
// // router.post(
// //   "/create",
// //   (req, res) => {
// //     const newEvent = new Event({
// //       location_id: req.body.location_id,
// //       user_id: req.body.user_id,
// //       teams_id: req.body.teams_id,
// //       date: req.body.date,
// //       sport: req.body.sport,
// //       skill: req.body.skill,
// //       type: req.body.type,
// //       team_size: req.body.team_size,
// //       num_teams: req.body.num_teams,
// //     });

// //     newEvent.save().then((event) => res.json(event));
// //   }

// router.post(
//   "/create",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateEventInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     const newEvent = new Event({
//       location_id: req.body.location_id,
//       user_id: req.user.id,
//       teams_id: req.body.teams_id,
//       date: req.body.date,
//       sport: req.body.sport,
//       skill: req.body.skill,
//       type: req.body.type,
//       team_size: req.body.team_size,
//       num_teams: req.body.num_teams,
//     });

//     newEvent.save().then((event) => res.json(event));
//   }
// );

// router.get("/", (req, res) => {
//   Event.find()
//     .sort({ date: -1 })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res.status(404).json({ noteventsfound: "No events found" })
//     );
// });

// router.get("/user/:user_id", (req, res) => {
//   Event.find({ user_id: req.params.user_id })
//     .sort({ date: -1 })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res.status(404).json({ noeventsfound: "No events found for that user" })
//     );
// });

// router.get("/team/:teams_id", (req, res) => {
//   Event.find({ teams_id: req.params.teams_id })
//     .sort({ date: -1 })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res.status(404).json({ noeventsfound: "No events found for that team" })
//     );
// });
// //
// router.get("/park/:location_id", (req, res) => {
//   Event.find({ location_id: req.params.location_id })
//     .sort({ date: -1 })
//     .then((events) => res.json(events))
//     .catch((err) =>
//       res
//         .status(404)
//         .json({ noeventsfound: "No events found for that location" })
//     );
// });

// router.get("/:id/teams", (req, res) => {
//   Event.findById(req.params.id, "teams_id")
//     .then((team) => res.json(team))
//     .catch((err) =>
//       res.status(404).json({ noteamsfound: "No teams found for that event" })
//     );
// });

// router.delete(
//   "/delete/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     await db.collection("events").deleteOne({ _id: ObjectID(req.params.id) });
//     res.json("deleted");
//   }
// );

// // router.put(
// //   "/update/:id",
// //   passport.authenticate("jwt", { session: false }),
// //   async (req, res) => {
// //     const { errors, isValid } = validateEventInput(req.body);

// //     if (!isValid) {
// //       return res.status(400).json(errors);
// //     }

// //     await db
// //       .collection("events")
// //       .replaceOne({ _id: ObjectID(req.params.id) }, req.body);
// //     res.json("updated");
// //   }
// // );

// router.put(
//   "/update/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { errors, isValid } = validateEventInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//     User.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         location_id: req.body.location_id,
//         user_id: req.user.id,
//         teams_id: req.body.teams_id,
//         date: req.body.date,
//         sport: req.body.sport,
//         skill: req.body.skill,
//         type: req.body.type,
//         team_size: req.body.team_size,
//         num_teams: req.body.num_teams,
//       },
//       { new: true },
//       function (err, result) {
//         if (err) {
//           res.json(err);
//         }
//         res.json(result);
//       }
//     );
//   }
// );

// // router.put(
// //   "/update/:id",
// //   passport.authenticate("jwt", { session: false }),
// //   async (req, res) => {
// //     const { errors, isValid } = validateEventInput(req.body);

// //     if (!isValid) {
// //       return res.status(400).json(errors);
// //     }

// //     Team.findByIdAndUpdate(req.params.id, {
// //       location_id: req.body.location_id,
// //       user_id: req.user.id,
// //       teams_id: req.body.teams_id,
// //       date: req.body.date,
// //       sport: req.body.sport,
// //       skill: req.body.skill,
// //       type: req.body.type,
// //       team_size: req.body.team_size,
// //       num_teams: req.body.num_teams,
// //     })
// //       .then((event) => {
// //         res.json('event');
// //       })
// //       .catch((err) => {
// //         res.status(400).json(err);
// //       });
// //   }
// // );

// module.exports = router;


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

router.get("/test", (req, res) => res.json({ msg: "Events route" }));

//events

//quick access post
// router.post(
//   "/create",
//   (req, res) => {
//     const newEvent = new Event({
//       location_id: req.body.location_id,
//       user_id: req.body.user_id,
//       teams_id: req.body.teams_id,
//       date: req.body.date,
//       sport: req.body.sport,
//       skill: req.body.skill,
//       type: req.body.type,
//       team_size: req.body.team_size,
//       num_teams: req.body.num_teams,
//     });

//     newEvent.save().then((event) => res.json(event));
//   }

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
      // user_id: req.user.id,
      teams_id: req.body.teams_id,
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

router.get("/", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) =>
      res.status(404).json({ noteventsfound: "No events found" })
    );
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "teams_id, location_id, user_id"
  );
  res.json(event);
});


router.get("/:id/teams", async (req, res) => {
  const teams = await Event.findById(req.params.id).populate(
    "teams_id"
  );
  const players = await Team.find({team_id: req.body.team_id}).populate("players_id")
  res.json(teams);
  const teamsObj = {};
  const playersObj = {};
  players.forEach(player => {
    playersObj[player.id] = player
  });
  teams.forEach(team => {
    teamObj[team.id] = team
  });
  return res.json({ teams: teamsObj, players: playersObj})
});


router.get("/user/:user_id", (req, res) => {
  Event.find({ user_id: req.params.user_id })
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) =>
      res.status(404).json({ noeventsfound: "No events found for that user" })
    );
});

router.get("/team/:teams_id", (req, res) => {
  Event.find({ teams_id: req.params.teams_id })
    .sort({ date: -1 })
    .then((events) => res.json(events))
    .catch((err) =>
      res.status(404).json({ noeventsfound: "No events found for that team" })
    );
});
//
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

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.collection("events").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);

// router.put(
//   "/update/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { errors, isValid } = validateEventInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//     User.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         location_id: req.body.location_id,
//         // user_id: req.user.id,
//         teams_id: req.body.teams_id,
//         date: req.body.date,
//         sport: req.body.sport,
//         skill: req.body.skill,
//         type: req.body.type,
//         team_size: req.body.team_size,
//         num_teams: req.body.num_teams,
//       },
//       { new: true },
//       function (err, result) {
//         if (err) {
//           res.json(err);
//         }
//         res.json(result);
//       }
//     );
//   }
// );

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newPlayer;

    Event.findByIdAndUpdate(
      { _id: req.params.id },
      {
        location_id: req.body.location_id,
        // user_id: req.user.id,
        teams_id: req.body.teams_id,
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

// router.put(
//   "/update/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const { errors, isValid } = validateEventInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     Team.findByIdAndUpdate(req.params.id, {
//       location_id: req.body.location_id,
//       user_id: req.user.id,
//       teams_id: req.body.teams_id,
//       date: req.body.date,
//       sport: req.body.sport,
//       skill: req.body.skill,
//       type: req.body.type,
//       team_size: req.body.team_size,
//       num_teams: req.body.num_teams,
//     })
//       .then((event) => {
//         res.json('event');
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   }
// );

module.exports = router;
