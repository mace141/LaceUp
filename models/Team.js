const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numPlayers: {
        type: Number,
        required: true
    },

    playersToFill: {
        type: Number,
        required: true
    },
    //minimum numbers of player for a sport (preset value)- numPlayers?

    // players:{
    //     type: Schema.Types.ObjectId,
    //     ref: "users"
    // },
    // event: {
    //     type: Schema.Types.ObjectId,
    //     ref: "events"
    // }

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Team = mongoose.model("Team", TeamSchema)