const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    location_id: {
        type: Number,
        required: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    teams_id: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        // required: true,
        // validate: {
        //     validator: function (v) {
        //         return (
        //             v && // check that there is a date object
        //             v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
        //             v.getTime() < Date.now() + 30 * 24 * 60 * 60 * 1000
        //         );
        //     },
        //     message:
        //         "An event must be at least 1 day from now and not more than 90 days.",
        // }
    },
    sport: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    team_size: {
        type: Number,
        required: true
    },
    num_teams: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

})

module.exports = Event = mongoose.model('event', EventSchema);