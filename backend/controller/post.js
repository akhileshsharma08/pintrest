const connectMongoDb = require('../database/db');
const userModel = require('../model/userModel');
const postModel = require('../model/postModel');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');
const path = require('path');
const multer = require('multer');


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
  const { userId, postText } = req.body;

  try {
    await connectMongoDb();

    //---------------- uploading image  -----------
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }

    const sampleFile = req.files.file;
    const uniqueFilename = uuidv4();
    const filenameWithExtension = `${uniqueFilename}${path.extname(sampleFile.name)}`;
    const uploadPath = __dirname + '/../../frontend/src/uploads/' + filenameWithExtension;

    await sampleFile.mv(uploadPath, async function (err) {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }

      //---------------- creating post -----------
      try {
        const createdPost = await postModel.create({ userId, postText });
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