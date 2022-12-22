/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// handle modified date change on date value change
const useWorkoutStatus = (workoutStatusArgs) => {
  // workout complete and not complete status state
  const [workoutStatus, setWorkoutStatus] = useState(workoutStatusArgs);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWorkoutStatusData = async () => {
      try {
        // fetch user data to autheticate user
        const response = await axios.get(
          `workouts/summary?date=${new Date()}`,
          {
            signal: signal,
          }
        );
        if (response.data) {
          console.log("response data", response.data);
          // set state here
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log("request error occurred", err);
        }
      }
    };
    getWorkoutStatusData();
    return () => {
      //   cancel request before component unmounts
      controller.abort();
    };
  }, []);
  return { workoutStatus, setWorkoutStatus };
};

export default useWorkoutStatus;
