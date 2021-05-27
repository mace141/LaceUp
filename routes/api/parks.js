const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Park = require("../../models/Park");

const validateParkInput = require("../../validation/parks");

router.get("/test", (req, res) => {
  res.json({ msg: "Park test" });
});
router.get("/", (req, res) => {
  Park.find()
    // .sort()
    .then((parks) => res.json(parks))
    .catch((err) => res.status(404).json({ noparksfound: "No parks found" }));
});

router.get("/:id", (req, res) => {
  Park.findById(req.params.id)
    .then((park) => res.json(park))
    .catch((err) =>
      res.status(404).json({ noparkfound: "No park found with that id" })
    );
});

//to create parks, may remove

router.post("/", (req, res) => {
  const newPark = new Park({
    name: req.body.name,
    address: req.body.address,
    zip: req.body.zip,
    borough: req.body.zip,
    lat: req.body.lat,
    lng: req.body.lng,
    sports: req.body.sports,
    events: req.body.events,
    // users: req.body.users
  });

  newPark.save().then((park) => res.json(park));
});

module.exports = router;
