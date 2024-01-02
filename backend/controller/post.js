const connectMongoDb = require('../database/db')
const userModel = require('../model/userModel')
const postModel = require('../model/postModel')
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');
const path = require('path');

const multer  = require('multer')

exports.getallPost=async (req,res)=>{
try {
    await connectMongoDb(); 
    const allpost = await postModel.find()
    res.status(200).send({allpost, message: "all post" });
    console.log(allpost,"jhgjh")
    return allpost
} catch (error) {
    
}
}
exports.createPost=async (req,res)=>{
    const { postText } = req.body;
  
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
     await sampleFile.mv(uploadPath, function (err) {
        if (err) {
          console.error('Error during file upload:', err);
          return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        res.status(200).json({
          success: true,
          filename: filenameWithExtension,
          mimetype: sampleFile.mimetype,
          size: sampleFile.size,
        });
      });
      //---------------- creating post -----------
      const createdPost = await postModel.create({ userId:"6583e3cd9d8ccbc31a187c94",postText });
      res.status(200).send({ user: createdPost, message: "User created successfully" });
      let user =await userModel.findOne({_id:"6583e3cd9d8ccbc31a187c94"})
      user.posts.push(createdPost._id)
      user.save()
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send('Internal Server Error');
    }
}
