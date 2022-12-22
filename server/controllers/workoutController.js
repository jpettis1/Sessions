const db = require("../models/sessionModels");

// function for generating monthly workout summary
const generateWorkoutSummaryStatus = (data) => {
  let complete = 0;
  let incomplete = 0;
  for (const workout of data) {
    if (workout.workout_status === true) {
      complete += 1;
    } else {
      incomplete += 1;
    }
  }
  return [
    { argument: 1, value: 0 },
    { argument: 2, value: incomplete },
    { argument: 3, value: complete },
  ];
};
// declare const set to object literal - hold methods on the workoutController object
const workoutController = {};

// declare a method get workout to query workouts for specific user
workoutController.getWorkouts = async (req, res, next) => {
  try {
    const values = [req.user._id, req.query.date];

    const queryStr =
      "SELECT workout_type, workout_details, workouts_id, athlete_notes, workout_status FROM workouts WHERE user_id = $1 AND workout_date = $2";

    // query db to insert new workout values
    const data = await db.query(queryStr, values);
    const populatedWorkouts = data.rows.map((el) => {
      return {
        workoutValue: el.workout_type,
        workoutDetails: el.workout_details,
        workoutId: el.workouts_id.toString(),
        athleteNotes: el.athlete_notes,
        workoutStatus: el.workout_status,
      };
    });

    res.locals.workouts = populatedWorkouts;
    return next();
  } catch (err) {
    return next({
      log: `workoutController.getWorkout: ${err}`,
      message: { err: "Failed to add workout" },
    });
  }
};

workoutController.getSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query.dateRange;
    const values = [startDate, endDate];

    const queryStr =
      "SELECT workout_status FROM workouts WHERE workout_date BETWEEN $1 AND $2";

    // query db to get completed workouts and non-completed workouts
    const data = await db.query(queryStr, values);
    console.log("summary data ->", data.rows);

    // compile workout summary data
    res.locals.workoutStatus = generateWorkoutSummaryStatus(data.rows);

    return next();
  } catch (err) {
    return next({
      log: `workoutController.getSummary: ${err}`,
      message: { err: "Failed to add workout" },
    });
  }
};

// declare a method add workout to save new workouts to the db
workoutController.addWorkout = async (req, res, next) => {
  try {
    const {
      workoutValue,
      workoutDetails,
      workoutStatus,
      athleteNotes,
      modifiedDate,
    } = req.body;

    const values = [
      workoutValue,
      workoutDetails,
      req.user._id,
      athleteNotes,
      workoutStatus,
      modifiedDate,
    ];

    const queryStr =
      "INSERT INTO workouts (workout_type, workout_details, user_id, athlete_notes, workout_status, workout_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING workout_type, workout_details, workouts_id, athlete_notes, workout_status";

    // query db to insert new workout values
    const data = await db.query(queryStr, values);

    // destructure returned data from db and input into return workouts obj
    const {
      workout_type,
      workout_details,
      workouts_id,
      athlete_notes,
      workout_status,
    } = data.rows[0];
    res.locals.workouts = {
      workoutValue: workout_type,
      workoutDetails: workout_details,
      workoutId: workouts_id.toString(),
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

// declare a method update workout to save new workouts to the db
workoutController.updateWorkout = async (req, res, next) => {
  try {
    const { workoutValue, workoutDetails, workoutStatus, athleteNotes } =
      req.body;
    console.log(req.body);
    const values = [
      workoutValue,
      workoutDetails,
      athleteNotes,
      workoutStatus,
      req.query.id,
    ];
    const queryStr =
      "UPDATE workouts SET workout_type = $1, workout_details = $2, athlete_notes = $3, workout_status = $4 WHERE workouts_id = $5 RETURNING workout_type, workout_details, workouts_id, athlete_notes, workout_status";

    // query db to insert new workout values
    const data = await db.query(queryStr, values);

    // destructure returned data from db and input into return workouts obj
    const {
      workout_type,
      workout_details,
      workouts_id,
      athlete_notes,
      workout_status,
    } = data.rows[0];

    res.locals.workout = {
      workoutValue: workout_type,
      workoutDetails: workout_details,
      workoutId: workouts_id.toString(),
      athleteNotes: athlete_notes,
      workoutStatus: workout_status,
    };

    return next();
  } catch (err) {
    return next({
      log: `workoutController.updateWorkout: ${err}`,
      message: { err: "Failed to update workout" },
    });
  }
};

// declare a method add workout to save new workouts to the db
workoutController.deleteWorkout = async (req, res, next) => {
  try {
    const values = [req.query.id];
    const queryStr =
      "DELETE FROM workouts WHERE workouts_id = $1 RETURNING workouts_id";

    // query db to insert new workout values
    const data = await db.query(queryStr, values);
    console.log(data.rows);
    res.locals.workoutId = data.rows[0].workouts_id.toString();

    return next();
  } catch (err) {
    return next({
      log: `workoutController.deleteWorkout: ${err}`,
      message: { err: "Failed to update workout" },
    });
  }
};
module.exports = workoutController;
