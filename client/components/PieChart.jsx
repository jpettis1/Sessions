import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const PieChart = () => (
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
    <Chart height={300} data={data}>
      <PieSeries
        outerRadius={0.6}
        valueField="value"
        argumentField="argument"
      />
    </Chart>
  </Paper>
);

export default PieChart;
