import React from "react";
import { Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const WorkoutDetailsTile = ({ value }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        padding: "10px",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: "#F95738",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h3>Selected Workout / {value.slice(0, 15)}</h3>
        <IconButton sx={{ color: "#2A2A2A" }}>
          <AddIcon />
        </IconButton>
      </Paper>
      <Paper elevation={5}>
        <h2>Word</h2>
      </Paper>
    </Paper>
  );
};

export default WorkoutDetailsTile;
