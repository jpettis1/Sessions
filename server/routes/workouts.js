const express = require("express");
// require workouts controller
const workoutsController = require("../controllers/workoutController");
// require middleware controllers
const router = express.Router();

// Get selected workout
// router.get("/",, (req, res) => {
//   return res.status(200).json(res.locals.character);
// });

// Post new workout to selected day
router.post("/", workoutsController.addWorkout, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

module.exports = router;
