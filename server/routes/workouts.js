const express = require("express");
// require workouts controller
const workoutsController = require("../controllers/workoutController");
// require authentication check middleware
const { isAuth } = require("../controllers/isUserAuthenticated");
// require middleware controllers
const router = express.Router();

// Get selected workout
router.get("/", isAuth, workoutsController.getWorkouts, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

// Post new workout to selected day
router.post("/", isAuth, workoutsController.addWorkout, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

// Update existing workout
router.put("/", isAuth, workoutsController.updateWorkout, (req, res) => {
  return res.status(200).json(res.locals.workout);
});

// Delete existing workout
router.delete("/", isAuth, workoutsController.deleteWorkout, (req, res) => {
  return res.status(200).json(res.locals.workoutId);
});
module.exports = router;
