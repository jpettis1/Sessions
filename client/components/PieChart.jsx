import React, { useContext } from "react";
import { AthleteHomePageContext } from "./AthleteHomepage.jsx";
import { Paper, Box } from "@mui/material";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";

const PieChart = () => {
  // props passed down from AthleteHOmePageContext
  const { workoutStatus } = useContext(AthleteHomePageContext);
  return (
    <Paper
      className="PieChart"
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "15px",
        //   alignItems: "center",
      }}
    >
      <h3>Monthly Summary</h3>
      <Chart height={300} data={workoutStatus}>
        <PieSeries
          outerRadius={0.6}
          valueField="value"
          argumentField="argument"
          color="red"
        />
      </Chart>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h4 className="pie-chart-key">
          Complete: <div className="workouts-completed"></div>
        </h4>
        <h4 className="pie-chart-key">
          Incomplete: <div className="workouts-incomplete"></div>
        </h4>
      </Box>
    </Paper>
  );
};

export default PieChart;
