const express = require('express');
const userModel = require('../model/userModel');
const router = express.Router();
const passportAuth = require("../controller/passportAuth")
const passportJwt = require("../controller/passportJwt")
const authentication = require('../controller/authentication');
const postController = require('../controller/post');
const common = require("../controller/common")


// Authentication Routes
// router.post('/register', passportAuth.registerUser);
// router.post('/login', passportAuth.loginUser);
// router.post('/logout', passportAuth.logoutUser);

// router.post('/register', authentication.registerUser);
// router.post('/login', authentication.getLogin);
// router.post('/logout', authentication.getLogOut);
router.post('/register', passportJwt.registerUser);
router.post('/login', passportJwt.loginUser);
router.post('/logout', passportJwt.logoutUser);
router.post('/isLoggedIn', passportJwt.isLoggedIn);

// Post Routes
router.get('/post/all', postController.getallPost);
router.post('/post/create', postController.createPost);
router.post('/post/user_post', postController.showAllPostOfUser);
router.get('/post/:id', postController.showSinglePost);
router.post('/user/profileUpload', common.uploadFile);

// Other routes
router.get('/profile', (req, res) => {
  res.send("Profile Page after Login");
});
router.get('/', (req, res) => {
  res.send("home page ");
});

module.exports = router;
