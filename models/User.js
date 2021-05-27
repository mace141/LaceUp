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
<<<<<<< HEAD
  // home_court: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "parks",
  // },
  team_id: {
    type: Schema.Types.ObjectId, 
    ref: "teams"
=======
  home_court: {
    type: Number,
    required: false,
    //eventually, home_court: [{type: Schema.Types.ObjectId, ref: "Park"}], in park user points to user id
  },
  team_id: {
    type: Number,
    required: false,
    //eventually, teams: [{type: Schema.Types.ObjectId, ref: "Team"}] // in teams, user points to user id
>>>>>>> be_routes
  },

  event_id: {
    type: Schema.Types.ObjectId,
    ref: "events",
  },
  // },
  post_id: {
<<<<<<< HEAD
    type: Schema.Types.ObjectId, 
    ref: "posts"
=======
    type: Number,
    required: false,
    //eventually, posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
>>>>>>> be_routes
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
