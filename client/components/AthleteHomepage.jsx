import React, { useState, useReducer, createContext } from 'react';
import ResponsiveAppBar from './global/AppBar.jsx';
import axios from 'axios';
import UpcomingEventsView from './UpcomingEvents.jsx';
import useDateAndWorkout from '../hooks/useDateAndWorkout';
import useWorkoutStatus from '../hooks/useWorkoutStatus.js';
import Calendar from './Calendar.jsx';
import WorkoutDetailsTile from './WorkoutDetailsTile.jsx';
import UpcomingCoachingSessions from './UpcomingCoachingSessions.jsx';
import FormDialog from './NewWorkoutFormDialog.jsx';
import PieChart from './PieChart.jsx';
import BarChart from './BarChart.jsx';
import { Box } from '@mui/material';

export const AthleteHomePageContext = createContext(null);

const modalStateReducer = (state, action) => {
  switch (action.type) {
    case 'changeModalVisibility':
      return {
        ...state,
        open: !state.open
      };
    case 'changeMethod':
      return {
        ...state,
        method: action.payload
      };
    case 'setWorkoutType':
      return { ...state, workoutValue: action.payload };
    default:
      return state;
  }
};

const AthleteHomepage = () => {
  const [initialModalState, changeModalState] = useReducer(modalStateReducer, {
    open: false,
    workoutValue: 'Bike',
    method: 'POST'
  });
  const [workoutId, setWorkoutId] = useState('');
  const [workoutDetails, setWorkoutDetails] = useState('');
  const [athleteNotes, setAthleteNotes] = useState('');
  const [coachNotes, setCoachNotes] = useState('');
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const { value, setValue, workouts, addWorkouts } = useDateAndWorkout([], new Date());
  const { workoutStatus, setWorkoutStatus, yearlySummary, setYearlySummary } = useWorkoutStatus();
  const { open, workoutValue, method } = initialModalState;

  // FORM METHODS
  // handle text input change
  const handleTextInputChange = (val, label) => {
    switch (label) {
      case 'Enter workout details':
        setWorkoutDetails(val);
        break;
      case "Enter coach's notes":
        setCoachNotes(val);
        break;
      case 'Enter athlete notes':
        setAthleteNotes(val);
        break;
      default:
        setWorkoutComplete((prevState) => !prevState);
    }
  };

  //reset form
  const resetForm = () => {
    // close modal
    changeModalState({ type: 'changeModalVisibility' });
    // set request method to false
    changeModalState({ type: 'changeMethod', payload: 'POST' });
    // reset form fields
    setWorkoutDetails('');
    setAthleteNotes('');
    setWorkoutComplete(false);
  };

  // populate form
  const populateForm = (id) => {
    for (const workout of workouts) {
      if (workout.workoutId === id) {
        const { workoutValue, workoutDetails, workoutId, workoutStatus, athleteNotes } = workout;
        changeModalState({
          type: 'setWorkoutType',
          payload: workoutValue
        });
        changeModalState({
          type: 'changeMethod',
          payload: 'PUT'
        });
        setWorkoutDetails(workoutDetails);
        setAthleteNotes(athleteNotes);
        setWorkoutComplete(workoutStatus);
        setWorkoutId(Number(workoutId));
      }
    }
  };

  // handle request to edit details of selected workout
  const editWorkoutDetails = (id) => {
    populateForm(id);
    // open modal
    changeModalState({
      type: 'changeModalVisibility'
    });
  };

  const fetchSummaryData = async (value) => {
    const response = await axios.get(`workouts/summary?date=${value}`);
    console.log('data response ->', response.data);
    setWorkoutStatus(response.data.workoutStatus);
    setYearlySummary(response.data.yearlySummary);
  };

  // Handle form submission
  const handleSubmission = async (e, deleteRequest) => {
    // prevent default refresh after form submission
    e.preventDefault();
    // declare obj to hold submission values sent to db, passing in required fields
    const data = {
      workoutValue: workoutValue,
      workoutDetails: workoutDetails,
      workoutStatus: workoutComplete,
      athleteNotes: athleteNotes,
      modifiedDate: value
    };
    if (deleteRequest) {
      const res = await axios.delete(`/workouts?id=${workoutId}`);
      resetForm();
      addWorkouts({ type: 'delete workout', payload: res.data });
    } else if (method === 'PUT') {
      const res = await axios.put(`/workouts?id=${workoutId}`, data);
      resetForm();
      addWorkouts({ type: 'edit workout', payload: res.data });
    } else {
      const res = await axios.post('/workouts', data);
      resetForm();
      addWorkouts({ type: 'add workout', payload: res.data });
    }
    fetchSummaryData(value);
  };

  const handleDateChange = async (newValue) => {
    fetchSummaryData(newValue);
    setValue(newValue);
  };

  return (
    <AthleteHomePageContext.Provider
      value={{
        value,
        handleDateChange,
        changeModalState,
        open,
        workoutValue,
        method,
        workoutDetails,
        athleteNotes,
        handleTextInputChange,
        resetForm,
        handleSubmission,
        workoutComplete,
        workouts,
        workoutStatus,
        yearlySummary,
        editWorkoutDetails,
        fetchSummaryData
      }}>
      <Box>
        <ResponsiveAppBar />
        <Box
          sx={{
            minHeight: 'calc(100vh - 210px)',
            marginBottom: '1.5rem',
            padding: '0 10px'
          }}>
          <h1 className="athlete-homepage-header">Training Schedule</h1>
          <Box className="GridContainer">
            <UpcomingEventsView />
            <Calendar />
            <WorkoutDetailsTile />
            <UpcomingCoachingSessions />
            <FormDialog />
            <PieChart />
            <BarChart />
          </Box>
        </Box>
      </Box>
    </AthleteHomePageContext.Provider>
  );
};

export default AthleteHomepage;
