const connectMongoDb = require('../database/db');
const userModel = require('../model/userModel');
const postModel = require('../model/postModel');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');
const path = require('path');
const multer = require('multer');
const { AsyncLocalStorage } = require('async_hooks');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// ----------------------------- get all post --------------------------
exports.getallPost = async (req, res) => {
  try {
    await connectMongoDb();
    const allpost = await postModel.find();
    res.status(200).send({ allpost, message: "all post" });
    console.log(allpost, "jhgjh");
    return allpost;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
// --------------------creating a post with file upload -------------------
exports.createPost = async (req, res) => {
  const { userId,postTitle, postText } = req.body;

  try {
    await connectMongoDb();

    //---------------- uploading image  -----------
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }

    const sampleFile = req.files.file;
    const uniqueFilename = uuidv4();
    const postImage = `${uniqueFilename}${path.extname(sampleFile.name)}`;
    const uploadPath = __dirname + '/../../frontend/public/uploads/' + postImage;

    await sampleFile.mv(uploadPath, async function (err) {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }

      //---------------- creating post -----------
      try {
        const createdPost = await postModel.create({ userId,postTitle, postText,postImage });
        res.status(200).json({ user: createdPost, message: 'Post created successfully' });

        let user = await userModel.findOne({ _id: userId });
        user.posts.push(createdPost._id);
        await user.save();
      } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// --------------post according to user---------------
exports.showAllPostOfUser = async (req, res) => {
const{token} = req.body
const mytoken = JSON.parse(token)

  try {
    const decoded = jwt.verify(mytoken.token, process.env.secret); 
    const userId = decoded.userId;
    console.log(userId,"showalluser")
    await connectMongoDb();
    const userPosts = await postModel.find({ userId }); 
    res.status(200).json({ userPosts, message: "All posts of the user" });
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// --------------show single post to user---------------

exports.showSinglePost = async (req, res) => {
  const { id } = req.params; 
  console.log(id);

  try {
    await connectMongoDb();
    const getpost = await postModel.findById({_id:id});

    if (!getpost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ getpost, message: "Get single post" });
    console.log(getpost, "Get Single post");
  } catch (error) {
    console.error('Error fetching single post:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
// --------------edit a post -------------------------

exports.editSinglePost=(req,res)=>{

}