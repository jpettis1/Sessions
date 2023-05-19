const express = require("express");
// require middleware controllers
const router = express.Router();
const passport = require("passport");
const registerUser = require("../controllers/registerUser");
// require authentication check middleware
const { isAuth } = require("../controllers/isUserAuthenticated");

// Handle local strategy with user name and password input
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "login/failure",
    successRedirect: "login/success",
  })
);

router.get("/success", (req, res) => {
  console.log("login success", req.user);
  res.status(200).json({ user: req.user });
});

router.get("/failure", (req, res) => {
  res.status(401).send("invalid user credentials");
});

// Handle local strategy sign up
router.post("/register", registerUser, (req, res) => {
  res.status(200).send("User successfully created");
});

// success callback
router.get("/auth/google/success", isAuth, (req, res) => {
  // could send back this data in a view and lay it out for the user
  res.status(200).json({
    success: true,
    message: "succesful",
    user: req.user,
  });
});

// failure callback
router.get("/auth/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// route handler for google auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// route handler with auth callback to handle success or failure
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/google/failure",
  })
);

module.exports = router;
