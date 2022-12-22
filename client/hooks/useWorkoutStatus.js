/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// handle modified date change on date value change
const useWorkoutStatus = () => {
  // workout complete and not complete status state
  const [workoutStatus, setWorkoutStatus] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWorkoutStatusData = async () => {
      try {
        // fetch summary data
        const response = await axios.get(
          `workouts/summary?date=${new Date()}`,
          {
            signal: signal,
          }
        );
        if (response.data) {
          // set state here
          setWorkoutStatus(response.data);
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
