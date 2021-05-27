const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  location_id: {
    type: mongoose.Types.ObjectId,
    ref: "Park",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  // team_id: {
  //   type: Array,
  //   required: false
  //   // ref: "Team",
  // },
  team_id: {
    type: [mongoose.Types.ObjectId],
    ref: "Team",
  },
  date: {
    type: Date,
    // min: [Date.now, "Must create a future event"],
    // max: ["2025-01-01"]
  },
  sport: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  team_size: {
    type: Number,
    required: true,
  },
  num_teams: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


module.exports = Event = mongoose.model("event", EventSchema);
