const connectMongoDb = require("../database/db");
const passport = require("passport");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Configure JWTStrategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret,
    },
    (payload, done) => {
      userModel.findById(payload.userId, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// Register User
exports.registerUser = async (req, res) => {
  try {
    connectMongoDb();

    const { username, email, password, dob } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password || !dob) {
      return res
        .status(400)
        .json({ message: "Username, email, password, and dob are required" });
    }

    // Check if the user with the given email already exists
    const existingUser = await userModel.findOne({ email }).lean().exec();
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      dob,
    });

    // Save the new user
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    handleRegistrationError(error, res);
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    connectMongoDb();
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).lean().exec();

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.secret, {
      expiresIn: "1h",
    });

    console.log("Login successful for user:", user.email);

    res.status(200).json({ message: "Login successful", token,userId: user._id });
  } catch (error) {
    handleAuthenticationError(error, res);
  }
};

// Logout User
exports.logoutUser = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      handleLogoutError(err, res);
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
};

// Middleware to check if the user is authenticated
// Middleware to check if the user is authenticated
exports.isLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (!user) {
        return res.status(401).json({ message: 'User is not authenticated' });
      }
  
      req.user = user;
      next();
    })(req, res, next);
  };
  
  