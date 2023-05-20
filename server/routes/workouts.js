const express = require('express');
const workoutsController = require('../controllers/workoutController');
const dateController = require('../controllers/dateController');
const { isAuth } = require('../controllers/isUserAuthenticated');
const router = express.Router();

router.get('/', isAuth, dateController.formatDate, workoutsController.getWorkouts, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

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

router.post('/', isAuth, dateController.formatDate, workoutsController.addWorkout, (req, res) => {
  return res.status(200).json(res.locals.workouts);
});

router.put('/', isAuth, workoutsController.updateWorkout, (req, res) => {
  return res.status(200).json(res.locals.workout);
});

router.delete('/', isAuth, workoutsController.deleteWorkout, (req, res) => {
  return res.status(200).json(res.locals.workoutId);
});

module.exports = router;
