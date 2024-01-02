const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

exports.uploadFile = (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }
        const sampleFile = req.files.file;
        const uniqueFilename = uuidv4(); 
        const filenameWithExtension = `${uniqueFilename}${path.extname(sampleFile.name)}`;
        const uploadPath = __dirname + '/../../frontend/src/uploads/' + filenameWithExtension;
        sampleFile.mv(uploadPath, function (err) {
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
      } catch (error) {
        console.error('Error during file upload:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
};
