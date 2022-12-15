import React, { useState, useEffect, useReducer, createContext } from "react";
import ResponsiveAppBar from "./global/AppBar.jsx";
import axios from "axios";
import UpcomingEventsView from "./UpcomingEvents.jsx";
import Calendar from "./Calendar.jsx";
import WorkoutDetailsTile from "./WorkoutDetailsTile.jsx";
import UpcomingCoachingSessions from "./UpcomingCoachingSessions.jsx";
import CustomUpcomingView from "./customcomponents/CustomBoxComponent.jsx";
import FormDialog from "./NewWorkoutFormDialog.jsx";
import PieChart from "./PieChart.jsx";
import BarChart from "./BarChart.jsx";
import FooterNavContent from "./global/FooterNavContent.jsx";
import ErrorBoundary from "./errorboundaries/error.jsx";
import { Box } from "@mui/material";

// create context to give child props access to values
export const AthleteHomePageContext = createContext(null);
// reducer for handling modal state changes
const modalStateReducer = (state, action) => {
  switch (action.type) {
    case "changeModalVisibility":
      return { open: !state.open, workoutValue: state.workoutValue };
    case "setWorkoutType":
      return { open: state.open, workoutValue: action.payload };
    default:
      return state;
  }
};

// workouts reducer handling data for workouts display
const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "add workout":
      const newState = state.map((el) => {
        return Object.assign({}, el);
      });
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
};

const AthleteHomepage = () => {
  // state holding date value for calendar component
  const [value, setValue] = useState(new Date());
  // state holding modified date value for workout and modal components
  const [modifiedDate, setModifiedDate] = useState("");
  // state holding toggle and initial workout values for modal
  const [initialModalState, changeModalState] = useReducer(modalStateReducer, {
    open: false,
    workoutValue: "Bike",
  });
  // state for form fields
  const [workoutDetails, setWorkoutDetails] = useState("");
  const [athleteNotes, setAthleteNotes] = useState("");
  const [workoutComplete, setWorkoutComplete] = useState(false);
  // state for selected workout day
  // const [selectedWorkoutDay, setSelectedWorkoutDay] = useState([]);
  const [workouts, addWorkouts] = useReducer(workoutsReducer, []);
  // handle text input change
  const handleTextInputChange = (val, label) => {
    switch (label) {
      case "Enter workout details":
        setWorkoutDetails(val);
        break;
      case "Enter coach's notes":
        setCoachNotes(val);
        break;
      case "Enter athlete notes":
        setAthleteNotes(val);
        break;
      default:
        setWorkoutComplete((prevState) => !prevState);
    }
  };

  //reset form
  const resetForm = () => {
    // close modal
    changeModalState({ type: "changeModalVisibility" });
    // reset form fields
    setWorkoutDetails("");
    setAthleteNotes("");
    setWorkoutComplete(false);
  };

  // Handle form submission
  const handleSubmission = async (e) => {
    // prevent default refresh after form submission
    e.preventDefault();
    // declare obj to hold submission values sent to db, passing in required fields
    const data = {
      workoutValue: initialModalState.workoutValue,
      workoutDetails: workoutDetails,
      workoutComplete: workoutComplete,
      athleteNotes: athleteNotes,
    };
    // reset input form
    resetForm();
    // make a put request to the db to submit new workout details
    const res = await axios.post("/workouts", data);
    // add new workout to state obj
    addWorkouts({ type: "add workout", payload: res.data });
  };

  // handle modified date change on date value change
  useEffect(() => {
    setModifiedDate(value.toString().slice(0, 15));
  }, [value]);
  // handle date change on click within calendar component
  function handleDateChange(newValue) {
    setValue(newValue);
  }

  // deconstruct values from initialModalState to pass into context provider
  const { open, workoutValue } = initialModalState;
  return (
    // Provide child components with parent state
    <AthleteHomePageContext.Provider
      value={{
        value,
        modifiedDate,
        handleDateChange,
        changeModalState,
        open,
        workoutValue,
        workoutDetails,
        athleteNotes,
        handleTextInputChange,
        resetForm,
        handleSubmission,
        workoutComplete,
        workouts,
      }}
    >
      <Box>
        <ResponsiveAppBar />
        <Box
          sx={{
            minHeight: "calc(100vh - 210px)",
            marginBottom: "1.5rem",
            padding: "0 10px",
          }}
        >
          <h1>Training Schedule</h1>
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
