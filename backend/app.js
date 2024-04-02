const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const createError = require("http-errors");
const cors = require("cors");
const mainRouter = require("./routes/mainRoute");
const passport = require("passport");
const connectMongoDb = require('./database/db');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
connectMongoDb()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hi akhilesh how are you",
    cookie: { secure: false },
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(fileUpload())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: '*',
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204, 
};
// Enable CORS for all routes
app.use(cors(corsOptions));

// 404 and Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
