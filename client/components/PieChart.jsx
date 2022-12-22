import React, { useContext } from "react";
import { AthleteHomePageContext } from "./AthleteHomepage.jsx";
import Paper from "@mui/material/Paper";
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
        padding: "10px",
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
    </Paper>
  );
};

export default PieChart;
