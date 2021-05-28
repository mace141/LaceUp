//address, name, zipcode, borough, lat and lng, available sports, has many events, has many users

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  borough: {
    type: String,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },

  sports: {
    type: String,
    required: true,
  },

  events: {
    type: mongoose.Types.ObjectId,
    ref: "events",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Park = mongoose.model("Park", ParkSchema);
