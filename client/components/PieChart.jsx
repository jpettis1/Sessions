import React, { useContext } from 'react';
import { AthleteHomePageContext } from './AthleteHomepage.jsx';
import { Paper, Box } from '@mui/material';
import { Palette } from '@devexpress/dx-react-chart';
import { ArgumentAxis, ValueAxis, Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';

const PieChart = () => {
  // props passed down from AthleteHOmePageContext
  const { workoutStatus, workoutStatusAvaliable } = useContext(AthleteHomePageContext);

  return (
    <Paper
      className="PieChart"
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15px'
        //   alignItems: "center",
      }}
    >
      <h3>Monthly Summary</h3>
      {workoutStatus.length > 1 ? (
        <Chart height={300} data={workoutStatus}>
          <PieSeries outerRadius={0.6} valueField="value" argumentField="argument" />
        </Chart>
      ) : (
        <h3 className="no-workout-notification">No workouts posted for this month</h3>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
