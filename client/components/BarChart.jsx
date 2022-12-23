import React, { useContext } from "react";
import { AthleteHomePageContext } from "./AthleteHomepage.jsx";
import Paper from "@mui/material/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];
const data = [
  { date: "Jan", value: 10 },
  { date: "Feb", value: 50 },
  { date: "Mar", value: 30 },
  { date: "Apr", value: 30 },
  { date: "May", value: 30 },
  { date: "Jun", value: 30 },
  { date: "Jul", value: 30 },
  { date: "Aug", value: 30 },
  { date: "Sep", value: 30 },
  { date: "Oct", value: 30 },
  { date: "Nov", value: 30 },
  { date: "Dec", value: 30 },
];

const BarChart = () => {
  // props passed down from AthleteHOmePageContext
  const { yearlySummary } = useContext(AthleteHomePageContext);
  return (
    <Paper
      className="BarChart"
      elevation={5}
      sx={{
        textAlign: "center",
        padding: "15px",
      }}
    >
      <h3>Yearly Summary</h3>

      <Chart height={300} data={yearlySummary}>
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries valueField="value" argumentField="date" barWidth={50} />
      </Chart>
    </Paper>
  );
};

export default BarChart;
