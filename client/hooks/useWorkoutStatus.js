/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { useState, useEffect } from 'react';
import axios from 'axios';

// handle modified date change on date value change
const useWorkoutStatus = () => {
  // workout complete and not complete status state
  const [workoutStatus, setWorkoutStatus] = useState([]);
  const [yearlySummary, setYearlySummary] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWorkoutStatusData = async () => {
      try {
        // fetch summary data
        const response = await axios.get(`workouts/summary?date=${new Date()}`, {
          signal: signal
        });
        if (response.data) {
          // set state here
          console.log('workout status res data', response.data);
          setWorkoutStatus(response.data.workoutStatus);
          setYearlySummary(response.data.yearlySummary);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          console.log('request error occurred', err);
        }
      }
    };
    getWorkoutStatusData();
    return () => {
      //   cancel request before component unmounts
      controller.abort();
    };
  }, []);
  return { workoutStatus, setWorkoutStatus, yearlySummary, setYearlySummary };
};

export default useWorkoutStatus;
