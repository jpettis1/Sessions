import React, { useState, useEffect, useReducer } from "react";
import UpcomingEventsView from "./UpcomingEvents.jsx";
import Calendar from "./Calendar.jsx";
import WorkoutDetailsTile from "./WorkoutDetailsTile.jsx";
import UpcomingCoachingSessions from "./UpcomingCoachingSessions.jsx";
import CustomUpcomingView from "./customcomponents/CustomBoxComponent.jsx";
import FormDialog from "./NewWorkoutFormDialog.jsx";
import PieChart from "./PieChart.jsx";
import BarChart from "./BarChart.jsx";
import ErrorBoundary from "./errorboundaries/error.jsx";
import { Box } from "@mui/material";

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
  // state to hold Upcoming Events table columns
  const [upcomingEventsColumnVals, setUpcomingEventColumnVals] = useState([
    { id: "event", label: "Event", minWidth: 170 },
    { id: "eventDetails", label: "Event Details", minWidth: 100 },
  ]);
  // state to hold Coaching Session table columns
  const [coachingSessionColumnVals, setCoachingSessionColumnVals] = useState(
    { id: "coach", label: "Coach", minWidth: 170 },
    { id: "meetingDetails", label: "Meeting Details", minWidth: 100 }
  );
  // state holding classname for Events table
  const [eventsTableClass, setEventsTableClass] = useState("EventsContainer");
  // state holding classname for Session table
  const [sessionTableClass, setSessionTableClass] = useState(
    "UpcomingCoachingSessions"
  );
  // handle modified date change on date value change
  useEffect(() => {
    setModifiedDate(value.toString().slice(0, 15));
  }, [value]);
  // handle date change on click within calendar component
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  // get values from initialModalState to pass into FormDialog
  const { open, workoutValue } = initialModalState;
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 230px)",
        marginBottom: "1.5rem",
        padding: "0 10px",
      }}
    >
      <h1>Training Schedule</h1>
      <Box className="GridContainer">
        <UpcomingEventsView />
        <Calendar
          handleDateChange={handleDateChange}
          value={value}
          changeModalState={changeModalState}
        />
        <WorkoutDetailsTile modifiedDate={modifiedDate} />
        <UpcomingCoachingSessions />
        <FormDialog
          open={open}
          modifiedDate={modifiedDate}
          dropDownValue={workoutValue}
          changeModalState={changeModalState}
        />
        <PieChart />
        <BarChart />
      </Box>
    </Box>
  );
};

export default AthleteHomepage;
