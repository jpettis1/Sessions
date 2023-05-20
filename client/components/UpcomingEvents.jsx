import React, { useState } from 'react';
import useRows from '../hooks/useRows';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';

// place holder state - will be replaced with data from database
const rows = [
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride'),
  createData('San Diego', 'Century Ride')
];

const columns = [
  { id: 'event', label: 'Event', minWidth: 170 },
  { id: 'eventDetails', label: 'Event Details', minWidth: 100 }
];

function createData(event, eventDetails) {
  return { event, eventDetails };
}

// upcoming events component
const UpcomingEventsView = () => {
  // state holding page indice
  const [page, setPage] = useState(0);
  const { rowsPerPage } = useRows(4);

  // change to new page display when user presses left or right arrow buttons
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: '10px'
      }}
      className="EventsContainer">
      <Paper
        elevation={5}
        sx={{
          textAlign: 'center',
          backgroundColor: '#08B2E3',
          padding: '10px',
          color: '#fff'
        }}>
        <h3>Upcoming Events</h3>
      </Paper>

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Event Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
            },
            overflowX: 'hidden'
          }}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Paper>
  );
};

export default UpcomingEventsView;
