const db = require("../models/sessionModels");

// declare const set to object literal - hold methods on the workoutController object
const workoutController = {};

// declare a method add workout to save new workouts to the db
workoutController.addWorkout = async (req, res, next) => {
  try {
    const { workoutValue, workoutDetails, workoutComplete, athleteNotes } =
      req.body;
    const id = 1;
    const values = [
      workoutValue,
      workoutDetails,
      id,
      athleteNotes,
      workoutComplete,
    ];
    const queryStr =
      "INSERT INTO workouts (workout_type, workout_details, user_id, athlete_notes, workout_status) VALUES ($1, $2, $3, $4, $5) RETURNING workout_type, workout_details, athlete_notes, workout_status;";

    const data = await db.query(queryStr, values);

    // destructure returned data from db and input into return object
    const { workout_type, workout_details, athlete_notes, workout_status } =
      data.rows[0];
    res.locals.workouts = {
      workout: workout_type,
      workoutDetails: workout_details,
      athleteNotes: athlete_notes,
      workoutStatus: workout_status,
    };
    return next();
  } catch (err) {
    return next({
      log: `workoutController.addWorkout: ${err}`,
      message: { err: "Failed to add workout" },
    });
  }
};

module.exports = workoutController;
