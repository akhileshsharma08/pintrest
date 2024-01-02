const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  pinId: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Add other like-related fields as needed
});


const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
