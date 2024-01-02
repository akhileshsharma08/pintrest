const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for likes
    },
  ],
  postImage: {
    type: String, // Assuming the image is stored as a URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;
