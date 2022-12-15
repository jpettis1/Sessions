const express = require("express");
// require middleware controllers
const router = express.Router();
const passport = require("passport");
const registerUser = require("../controllers/registerUser");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.post("/register", registerUser, (req, res) => {
  res.redirect("/login");
});

module.exports = router;
