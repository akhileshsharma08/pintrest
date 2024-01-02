const connectMongoDb = require('../database/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Configure LocalStrategy
passport.use(new LocalStrategy({ usernameField: 'email' }, userModel.authenticate()));

// Register User
exports.registerUser = async (req, res) => {
  try {
    connectMongoDb();

    const { username, email, password, dob } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password || !dob) {
      return res.status(400).json({ message: 'Username, email, password, and dob are required' });
    }

    // Check if the user with the given email already exists
    const existingUser = await userModel.findOne({ email }).lean().exec();
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, email, password, dob });

    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    handleRegistrationError(error, res);
  }
};

// Login User

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    try {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!user) {
        console.log('Incorrect username or password for user:', req.body.email, req.body.password);
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      // Use bcrypt.compare to compare hashed passwords
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!passwordMatch) {
        console.log('Password mismatch');
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      // Password matches, generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1h' });

      // Log successful login
      console.log('Login successful for user:', user.email);

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  })(req, res, next);
};

// Logout User
exports.logoutUser = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      handleLogoutError(err, res);
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};

// Middleware to check if the user is authenticated
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).json({ message: 'User is not authenticated' });
};

// Helper functions for error handling

function handleRegistrationError(error, res) {
  console.error('Error registering user:', error);

  if (error.name === 'MongoError' && error.message.includes('buffering timed out after')) {
    res.status(500).json({ message: 'Database operation timed out. Please try again.' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

function handleLoginResult(err, user, info, req, res) {
  console.log('Authentication Result:', { err, user, info });

  if (err) {
    console.error('Error during authentication:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } else if (!user) {
    console.log('Incorrect username or password for user:', req.body.email, req.body.password);
    res.status(401).json({ message: 'Incorrect email or password.' });
  } else {
    handlePasswordComparison(req.body.password, user, res);
  }
}

function handlePasswordComparison(providedPassword, user, res) {
  const passwordMatch = bcrypt.compareSync(providedPassword, user.password);

  console.log('Stored Hashed Password:', user.password);
  console.log('Provided Password:', providedPassword);

  if (!passwordMatch) {
    console.log('Password mismatch');
    res.status(401).json({ message: 'Incorrect email or password.' });
  } else {
    handleSuccessfulLogin(user, res);
  }
}

function handleSuccessfulLogin(user, res) {
  const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1h' });

  console.log('Login successful for user:', user.email);
  res.status(200).json({ message: 'Login successful', token });
}

function handleAuthenticationError(error, res) {
  console.error('Error during authentication:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}

function handleDatabaseConnectionError(error, res) {
  console.error('Error connecting to the database:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}

function handleLogoutError(err, res) {
  console.error('Error destroying session:', err);
  res.status(500).json({ message: 'Internal Server Error' });
}
