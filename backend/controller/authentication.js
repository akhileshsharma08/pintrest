const connectMongoDb = require('../database/db');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




exports.registerUser = async (req, res) => {
  try {
    await connectMongoDb();
    const { username, email, password, dob } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({ username, email, password:hashedPassword, dob });
    res.status(201).send({ message: "User created successfully", user: userData });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


exports.getLogin = async (req, res) => {
  try {
    await connectMongoDb();
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    console.log(user,"user....")
    const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1h' });
    
    req.session.token = token;

    res.cookie('token', token, {
      httpOnly: true,
      secure: 'production', 
      maxAge: 3600000, 
     });
    
    res.status(200).json({ message: 'Login successful', token ,userId:user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// ================== Logout ======================
exports.getLogOut = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
    return res.status(200).send({ message: "Logout successful" });
  });
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };

// ------------------------------
// Middleware to check if the user is authenticated

// exports.authenticateUser = (req, res, next) => {
//   if (req.session && req.session.user) {
//     return next();
//   }
//   res.status(401).json({ message: 'Unauthorized' });
// };