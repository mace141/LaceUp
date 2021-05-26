//address, name, zipcode, borough, lat and lng, available sports, has many events, has many users

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    borough: {
        type: String,
        required: true
    },
    
    lng: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },

    sports: {
        type: String,
        required: true
    },
    //sports.split(',') to make array for frontend!!

    events: {
        type: Schema.Types.ObjectId,
        ref: "events"
    },
    // users: {
    //     type: Schema.Types.ObjectId,
    //     ref: "users"
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Park = mongoose.model("Park", ParkSchema)