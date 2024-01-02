const mongoose = require("mongoose");


const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: "User", required: true },
  // Add other pin-related fields as needed
});



const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
