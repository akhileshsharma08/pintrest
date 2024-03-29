const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
