const path = require("path");
const express = require("express");
const session = require("express-session");
// require passport to authenticate users via google and local strategy
const passport = require("passport");
require("dotenv").config();
// requiring auth strategies for authenticating users
require("./passportConfig/googleAuthStrategy");
require("./passportConfig/localAuthStrategy");
// require authentication check middleware
const { isAuth } = require("./controllers/isUserAuthenticated");
// const cookieParser = require("cookie-parser");
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
/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../client")));
/**
 * define route handlers
 */
// route handler to response to put requests to /workouts
app.use("/workouts", workoutsRouter);
// route handler to respond to get requests to users / login
app.use("/users", usersRouter);
// route handler to respond with main app
// route to handle login
app.use("/login", loginRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
// route handler with auth callback to handle success or failure
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);
// route handler for google auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// success callback
app.get("/auth/google/success", isAuth, (req, res) => {
  // could send back this data in a view and lay it out for the user
  res.status(200).json({
    success: true,
    message: "succesful",
    user: req.user,
  });
});

// failure callback
app.get("/auth/google/failure", (req, res) => {
  res.send("failed to authenticate!");
});

// logout user
app.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
});
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
