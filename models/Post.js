const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "event"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
