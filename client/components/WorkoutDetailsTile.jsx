import React, { useState, useContext } from 'react';
import { AthleteHomePageContext } from './AthleteHomepage.jsx';
import {
  Box,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { el } from 'date-fns/locale';
// format and populate columns and rows of table
const columns = [
  { id: 'workoutValue', label: 'Workout', minWidth: 170 },
  { id: 'workoutDetails', label: 'Workout Details', minWidth: 100 }
];

const WorkoutDetailsTile = () => {
  const { value, modifiedDate, changeModalState, workouts, editWorkoutDetails } =
    useContext(AthleteHomePageContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper
      className="WorkoutDetails"
      elevation={5}
      sx={{
        padding: '10px'
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: '#08B2E3',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          color: '#fff'
        }}
      >
        <h3>Selected Workout / {value.toString().slice(0, 15)}</h3>
        <Box>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => {
              changeModalState({
                type: 'changeModalVisibility'
              });
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </Paper>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Workout</TableCell>
                <TableCell>Workout Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    id={row.workoutId}
                    onClick={(e) => editWorkoutDetails(e.currentTarget.id)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            '& .css-pdct74-MuiTablePagination-selectLabel': { display: 'none' },
            '& .css-194a1fa-MuiSelect-select-MuiInputBase-input.MuiSelect-select': {
              display: 'none'
            },
            '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon ': {
              display: 'none'
            }
          }}
          component="div"
          count={workouts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Paper>
  );
};

export default WorkoutDetailsTile;

// .toDateString()
