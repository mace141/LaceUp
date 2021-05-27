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
  // home_court: {
  //   type: Number,
  //   required: false,
  //   //eventually, home_court: [{type: Schema.Types.ObjectId, ref: "Park"}], in park user points to user id
  // },
  team_id: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
  },
  event_id: {
    type: mongoose.Types.ObjectId,
    ref: "event",
  },
  post_id: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
