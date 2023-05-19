/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// workouts reducer handling data for workouts display
const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "add workout":
      const newState = state.map((el) => {
        return Object.assign({}, el);
      });
      newState.push(action.payload);
      return newState;
    case "edit workout":
      const updatedState = state.map((el) => {
        if (el.workoutId === action.payload.workoutId) {
          return action.payload;
        } else {
          return Object.assign({}, el);
        }
      });
      return updatedState;
    case "get workouts":
      const initialWorkoutsState = action.payload;
      return initialWorkoutsState;
    case "delete workout":
      const updatedStateWithDelete = [];
      for (const workout of state) {
        if (workout.workoutId !== action.payload) {
          updatedStateWithDelete.push(Object.assign({}, workout));
        }
      }
      return updatedStateWithDelete;
    default:
      return state;
  }
};

// handle modified date change on date value change
const useDateAndWorkout = (workoutData, date) => {
  // state holding modified date value for workout and modal components
  const [value, setValue] = useState(date);
  const [workouts, addWorkouts] = useReducer(workoutsReducer, workoutData);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWorkoutData = async () => {
      try {
        // fetch user data to autheticate user
        //
        const response = await axios.get(`workouts?date=${value}`, {
          signal: signal,
        });
        if (response.data) {
          console.log("response data", response.data);
          addWorkouts({
            type: "get workouts",
            payload: response.data,
          });
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log("request error occurred", err);
        }
      }
    };
    getWorkoutData();
    return () => {
      //   cancel request before component unmounts
      controller.abort();
    };
  }, [value]);
  return { value, setValue, workouts, addWorkouts };
};

export default useDateAndWorkout;
