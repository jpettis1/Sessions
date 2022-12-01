import React, { useState, useEffect } from "react";
import UpcomingEventsView from "./UpcomingEvents.jsx";
import Calendar from "./Calendar.jsx";
import WorkoutDetailsTile from "./WorkoutDetailsTile.jsx";
import UpcomingCoachingSessions from "./UpcomingCoachingSessions.jsx";
import FormDialog from "./NewWorkoutFormDialog.jsx";
import PieChart from "./PieChart.jsx";
import BarChart from "./BarChart.jsx";
import ErrorBoundary from "./errorboundaries/error.jsx";
import { Box } from "@mui/material";

const AthleteHomepage = () => {
  // state holding date value for calendar component
  const [value, setValue] = useState(new Date());
  // state holding modified date value for workout and modal components
  const [modifiedDate, setModifiedDate] = useState("");
  // state holding MainFormDialog toggle open/close
  const [open, setOpen] = React.useState(false);
  // state holding default value of DropDownMenuWorkoutSelect
  const [dropDownValue, setDropDownValue] = useState("Bike");

  // handle modified date change on date value change
  useEffect(() => {
    setModifiedDate(value.toString().slice(0, 15));
  }, [value]);
  // handle date change on click within calendar component
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  // handle open MainFormDialog modal
  const handleClickOpen = (workoutType) => {
    setOpen(true);
    if (workoutType) {
      setDropDownValue(workoutType);
    }
  };
  // handle close MainFormDialog modal
  const handleClose = () => {
    setOpen(false);
  };

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
          handleClickOpen={handleClickOpen}
        />
        <WorkoutDetailsTile
          modifiedDate={modifiedDate}
          handleClickOpen={handleClickOpen}
        />
        <UpcomingCoachingSessions />
        <FormDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          modifiedDate={modifiedDate}
          dropDownValue={dropDownValue}
        />
        <PieChart />
        <BarChart />
      </Box>
    </Box>
  );
};

export default AthleteHomepage;
