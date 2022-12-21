const path = require("path");
const express = require("express");
const session = require("express-session");
// require passport to authenticate users via google and local strategy
const passport = require("passport");
require("dotenv").config();
// requiring auth strategies for authenticating users
require("./passportConfig/googleAuthStrategy");
require("./passportConfig/localAuthStrategy");

const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

// handle session data, gives access to req.session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false },
  })
);
// refresh the passport middleware every time we load a route (e.g. maybe the session has expired)
app.use(passport.initialize());
// corresponds to the express session middleware, passport bootstraps off of this to authenticate users
// via serialize/deserialize user
app.use(passport.session());
/**
 * require routers
 */
const usersRouter = require("./routes/users");
const workoutsRouter = require("./routes/workouts");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * handle requests for static files
 */
// app.use(express.static(path.resolve(__dirname, "../client")));
/**
 * define route handlers
 */
// route handler to response to put requests to /workouts
app.use("/workouts", workoutsRouter);
// route handler to respond to get requests to users / login
app.use("/users", usersRouter);
// route to handle login
app.use("/login", loginRouter);
// route to handle logout
app.use("/logout", logoutRouter);

// serve main application
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// catch-all route handler for any requests to an unknown route
app.use("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
/**
 * configure express global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("errorObj.log: ", errorObj.log);
  console.error(err.stack);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
// // export app
// module.exports = app;
