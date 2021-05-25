const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    event_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

})

module.exports = Post = mongoose.model('post', PostSchema);