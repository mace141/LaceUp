const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  location_id: {
    type: Number,
    required: false,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  teams_id: {
    type: Schema.Types.ObjectId,
    ref: "teams",
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
