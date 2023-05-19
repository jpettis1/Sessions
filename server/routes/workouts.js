const express = require('express');
// require workouts controller
const workoutsController = require('../controllers/workoutController');
// require date controller
const dateController = require('../controllers/dateController');
// require authentication check middleware
const { isAuth } = require('../controllers/isUserAuthenticated');
// require middleware controllers
const router = express.Router();

// Get selected workout
router.get('/', isAuth, dateController.formatDate, workoutsController.getWorkouts, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

// get sumary of workouts
router.get(
  '/summary',
  isAuth,
  dateController.getDateRanges,
  workoutsController.getMonthlySummary,
  workoutsController.getYearlySummary,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);
// dateController.formatDate,
// Post new workout to selected day
router.post('/', isAuth, dateController.formatDate, workoutsController.addWorkout, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

// Update existing workout
router.put('/', isAuth, workoutsController.updateWorkout, (req, res) => {
  return res.status(200).json(res.locals.workout);
});

// Delete existing workout
router.delete('/', isAuth, workoutsController.deleteWorkout, (req, res) => {
  return res.status(200).json(res.locals.workoutId);
});
module.exports = router;
