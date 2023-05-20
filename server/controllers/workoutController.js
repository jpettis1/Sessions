const db = require('../models/sessionModels');

const retrieveSummaryInfo = async (startDate, endDate) => {
  const values = [startDate, endDate];
  const queryStr = 'SELECT workout_status FROM workouts WHERE workout_date BETWEEN $1 AND $2';
  const data = await db.query(queryStr, values);
  return data.rows;
};

const calculateSummary = (data) => {
  let complete = 0;
  let incomplete = 0;
  for (const workout of data) {
    if (workout.workout_status === true) {
      complete += 1;
    } else {
      incomplete += 1;
    }
  }
  return [complete, incomplete];
};

const workoutController = {};

workoutController.getWorkouts = async (req, res, next) => {
  try {
    const values = [req.user._id, req.query.date];

    const queryStr =
      'SELECT workout_type, workout_details, workouts_id, athlete_notes, workout_status FROM workouts WHERE user_id = $1 AND workout_date = $2';

    const data = await db.query(queryStr, values);
    const populatedWorkouts = data.rows.map((el) => {
      return {
        workoutValue: el.workout_type,
        workoutDetails: el.workout_details,
        workoutId: el.workouts_id.toString(),
        athleteNotes: el.athlete_notes,
        workoutStatus: el.workout_status
      };
    });

    res.locals.workouts = populatedWorkouts;
    return next();
  } catch (err) {
    return next({
      log: `workoutController.getWorkout: ${err}`,
      message: { err: 'Failed to add workout' }
    });
  }
};

workoutController.getMonthlySummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query.dateRange;
    const data = await retrieveSummaryInfo(startDate, endDate);
    const summaryResult = calculateSummary(data);

    if (summaryResult[0] !== 0 || summaryResult[1] !== 0) {
      res.locals.workoutStatus = [
        { argument: 1, value: 0 },
        { argument: 2, value: summaryResult[1] },
        { argument: 3, value: summaryResult[0] }
      ];
    } else {
      res.locals.workoutStatus = [{ argument: 1, value: 0 }];
    }

    return next();
  } catch (err) {
    return next({
      log: `workoutController.getSummary: ${err}`,
      message: { err: 'Failed to add workout' }
    });
  }
};

workoutController.getYearlySummary = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    let month = '01';
    let nextMonth;
    const dateRanges = [];
    for (let i = 0; i < 12; i++) {
      nextMonth = Number(month) + 1;
      if (nextMonth < 10) {
        nextMonth = '0' + nextMonth;
      }
      if (nextMonth > 12) {
        nextMonth = '01';
        dateRanges.push([`${year}-${month}-01`, `${year + 1}-${nextMonth}-01`]);
      } else {
        dateRanges.push([`${year}-${month}-01`, `${year}-${nextMonth}-01`]);
      }
      month = Number(month) + 1;
      if (month < 10) {
        month = '0' + month;
      }
    }

    // data formatted for line chart
    const yearSummaryResult = [
      { date: 'Jan' },
      { date: 'Feb' },
      { date: 'Mar' },
      { date: 'Apr' },
      { date: 'May' },
      { date: 'Jun' },
      { date: 'Jul' },
      { date: 'Aug' },
      { date: 'Sep' },
      { date: 'Oct' },
      { date: 'Nov' },
      { date: 'Dec' }
    ];

    // retrieve, calculate, and append value to yearlySummary result
    for (let j = 0; j < dateRanges.length; j++) {
      const data = await retrieveSummaryInfo(dateRanges[j][0], dateRanges[j][1]);
      yearSummaryResult[j].value = calculateSummary(data)[0];
    }

    res.locals.yearlySummary = yearSummaryResult;

    return next();
  } catch (err) {
    return next({
      log: `workoutController.getYearlySummary: ${err}`,
      message: { err: 'Failed to fetch yearly summary' }
    });
  }
};

workoutController.addWorkout = async (req, res, next) => {
  try {
    console.log('this is req user', req.user);
    const { workoutValue, workoutDetails, workoutStatus, athleteNotes, modifiedDate } = req.body;

    const values = [
      workoutValue,
      workoutDetails,
      req.user._id,
      athleteNotes,
      workoutStatus,
      modifiedDate
    ];

    const queryStr =
      'INSERT INTO workouts (workout_type, workout_details, user_id, athlete_notes, workout_status, workout_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING workout_type, workout_details, workouts_id, athlete_notes, workout_status';

    const data = await db.query(queryStr, values);

    const { workout_type, workout_details, workouts_id, athlete_notes, workout_status } =
      data.rows[0];
    res.locals.workouts = {
      workoutValue: workout_type,
      workoutDetails: workout_details,
      workoutId: workouts_id.toString(),
      athleteNotes: athlete_notes,
      workoutStatus: workout_status
    };
    return next();
  } catch (err) {
    return next({
      log: `workoutController.addWorkout: ${err}`,
      message: { err: 'Failed to add workout' }
    });
  }
};

workoutController.updateWorkout = async (req, res, next) => {
  try {
    const { workoutValue, workoutDetails, workoutStatus, athleteNotes } = req.body;
    console.log(req.body);
    const values = [workoutValue, workoutDetails, athleteNotes, workoutStatus, req.query.id];
    const queryStr =
      'UPDATE workouts SET workout_type = $1, workout_details = $2, athlete_notes = $3, workout_status = $4 WHERE workouts_id = $5 RETURNING workout_type, workout_details, workouts_id, athlete_notes, workout_status';

    const data = await db.query(queryStr, values);

    const { workout_type, workout_details, workouts_id, athlete_notes, workout_status } =
      data.rows[0];

    res.locals.workout = {
      workoutValue: workout_type,
      workoutDetails: workout_details,
      workoutId: workouts_id.toString(),
      athleteNotes: athlete_notes,
      workoutStatus: workout_status
    };

    return next();
  } catch (err) {
    return next({
      log: `workoutController.updateWorkout: ${err}`,
      message: { err: 'Failed to update workout' }
    });
  }
};

workoutController.deleteWorkout = async (req, res, next) => {
  try {
    const values = [req.query.id];
    const queryStr = 'DELETE FROM workouts WHERE workouts_id = $1 RETURNING workouts_id';

    const data = await db.query(queryStr, values);
    console.log(data.rows);
    res.locals.workoutId = data.rows[0].workouts_id.toString();

    return next();
  } catch (err) {
    return next({
      log: `workoutController.deleteWorkout: ${err}`,
      message: { err: 'Failed to update workout' }
    });
  }
};
module.exports = workoutController;
