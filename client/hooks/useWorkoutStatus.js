import { useState, useEffect } from 'react';
import axios from 'axios';

// handle modified date change on date value change
const useWorkoutStatus = () => {
  const [workoutStatus, setWorkoutStatus] = useState([]);
  const [yearlySummary, setYearlySummary] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWorkoutStatusData = async () => {
      try {
        const response = await axios.get(`workouts/summary?date=${new Date()}`, {
          signal: signal
        });
        if (response.data) {
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
      controller.abort();
    };
  }, []);
  return { workoutStatus, setWorkoutStatus, yearlySummary, setYearlySummary };
};

export default useWorkoutStatus;
