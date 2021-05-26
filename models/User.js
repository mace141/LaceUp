const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  favorite_sports: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
    data: Buffer,
  },
  //associations
  // home_court: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "parks",
  // },
  team_id: {
    type: Schema.Types.ObjectId, 
    ref: "teams"
  },

  event_id: {
    type: Schema.Types.ObjectId,
    ref: "events",
  },
  // },
  post_id: {
    type: Schema.Types.ObjectId, 
    ref: "posts"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
