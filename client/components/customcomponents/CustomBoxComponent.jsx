import React, { useState, useEffect } from 'react';
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
// format and populate columns and rows of table
// create column data to use as map when populating rows

// function to create row data
// function createData(event, eventDetails) {
//   return { event, eventDetails };
// }

// row data
// const rows = [
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
//   createData("San Diego", "Century Ride"),
// ];

const columns = [
  { id: 'event', label: 'Event', minWidth: 170 },
  { id: 'eventDetails', label: 'Event Details', minWidth: 100 }
];

// upcoming events component
const CustomUpcomingView = (props) => {
  const { columns, rows, customClass } = props;
  // state holding page indice
  const [page, setPage] = useState(0);
  // state holding number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(4);
  // state holding boolean value for whether or not handle resize was called initially
  const [handleInitialResize, setHandleInitialResize] = useState(false);

  // listen for window resize, adjusting number of rows per page at 1200px
  const handleResize = () => {
    if (window.innerWidth < 1600) {
      setRowsPerPage(7);
    }
    if (window.innerWidth < 1500) {
      setRowsPerPage(4);
    }
    if (rowsPerPage !== 11 && window.innerWidth > 1600) {
      setRowsPerPage(11);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // conditional, if initial resize has not occured upon load, handleResize and reassign initial resize to true
    if (!handleInitialResize) {
      handleResize();
      setHandleInitialResize(true);
    }
  }, []);

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
      className={customClass}>
      <Paper
        elevation={5}
        sx={{
          textAlign: 'center',
          backgroundColor: '#08B2E3',
          padding: '10px',
          color: '#fff'
        }}>
        <h2>Upcoming Events</h2>
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

export default CustomUpcomingView;
