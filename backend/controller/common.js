const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs/promises'); // Use the fs.promises module for async file operations
const userModel = require('../model/userModel');

exports.uploadFile = async (req, res) => {
  const { userId } = req.body;
  console.log(userId, "upload");

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    const profileImageFile = req.files.profile; // Update to "profile" here
    if (!profileImageFile || !profileImageFile.name) {
      return res.status(400).json({ success: false, message: 'Invalid file uploaded.' });
    }
    // Remove the previous profile image associated with the user
    try {
      const user = await userModel.findOne({ _id: userId });
      if (user.profileImage) {
        const previousImagePath = path.join(__dirname, `/../../frontend/public/uploads/profiles/${user.profileImage}`);
        await fs.unlink(previousImagePath);
      }
    } catch (error) {
      console.error('Error removing previous profile image:', error.message);
    }

    const uniqueFilename = uuidv4();
    const profileImage = `${uniqueFilename}${path.extname(profileImageFile.name)}`;
    const uploadPath = path.join(__dirname, `/../../frontend/public/uploads/profiles/${profileImage}`);

    profileImageFile.mv(uploadPath, async function (err) {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }

      try {
        const user = await userModel.findOne({ _id: userId });
        // Update the profileImage field
        user.profileImage = profileImage;
        // Save the changes
        await user.save();
        res.status(200).json({
          success: true,
          filename: profileImage,
          mimetype: profileImageFile.mimetype,
          size: profileImageFile.size,
        });
      } catch (error) {
        console.error('Error updating profileImage field:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
