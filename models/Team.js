// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TeamSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     numPlayers: {
//         type: Number,
//         required: true
//     },

//     playersToFill: {
//         type: Number,
//         required: true
//     },
//     //minimum numbers of player for a sport (preset value)- numPlayers?

//     player_id:{
//         type: [Schema.Types.ObjectId],
//         ref: "User"
//     },
//     event_id: {
//         type: mongoose.Types.ObjectId,
//         ref: "event"
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// })

// module.exports = Team = mongoose.model("Team", TeamSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numPlayers: {
    type: Number,
    required: true,
  },

  playersToFill: {
    type: Number,
    required: true,
  },
  //minimum numbers of player for a sport (preset value)- numPlayers?

  player_id: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
    //     type: Array,
    //     required: false
  }],
  event_id: {
    type: mongoose.Types.ObjectId,
    ref: "event",
    // type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Team = mongoose.model("Team", TeamSchema);