import React, { useState } from "react";
import Calendar from "./Calendar.jsx";
import WorkoutDetailsTile from "./WorkoutDetailsTile.jsx";
import { Box } from "@mui/material";
const AthleteHomepage = () => {
  const [value, setValue] = useState(new Date());
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        justifyContent: "center",
        padding: "0 10px",
        gap: "10px",
      }}
    >
      <Calendar handleDateChange={handleDateChange} value={value} />
      <WorkoutDetailsTile value={value.toString()} />
    </Box>
  );
};

export default AthleteHomepage;
