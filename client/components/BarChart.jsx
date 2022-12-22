import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  PieSeries,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const BarChart = () => (
  <Paper
    className="BarChart"
    elevation={5}
    sx={{
      textAlign: "center",
      padding: "15px",
    }}
  >
    <h3>Yearly Summary</h3>

    <Chart height={300} data={data}>
      {/* <h2>Monthly Summary</h2> */}
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="value" argumentField="argument" barWidth={50} />
    </Chart>
  </Paper>
);

export default BarChart;
