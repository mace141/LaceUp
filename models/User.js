const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: Text,
        required: false
    },
    home_court: {
        type: String,
        required: false
    },
    favorite_sports: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false,
        data: Buffer
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = User = mongoose.model('users', UserSchema);