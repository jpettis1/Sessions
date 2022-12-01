import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { textAlign } from "@mui/system";

// format and populate columns and rows of table
// create column data to use as map when populating rows
const columns = [
  { id: "coach", label: "Coach", minWidth: 170 },
  { id: "meetingDetails", label: "Meeting Details", minWidth: 100 },
];

// function to create row data
function createData(coach, meetingDetails) {
  return { coach, meetingDetails };
}

// row data
const rows = [
  createData("Matt Freeman", "Discuss intervals"),
  createData("Matt Freeman", "SD Event prep"),
];

// upcoming coaching sessions component
const UpcomingCoachingSessions = () => {
  // state holding page indice
  const [page, setPage] = React.useState(0);
  // state holding number of rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(11);
  // state holding boolean value for whether or not handle resize was called initially
  const [handleInitialResize, setHandleInitialResize] = React.useState(false);

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

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
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
        padding: "10px",
      }}
      className="UpcomingCoachingSessions"
    >
      <Paper
        elevation={5}
        sx={{
          textAlign: "center",
          backgroundColor: "#08B2E3",
          padding: "10px",
          color: "#fff",
        }}
      >
        <h2>Coaching Sessions</h2>
      </Paper>
      <Paper sx={{ width: "100%" }}>
        <TableContainer
          sx={{
            maxHeight: "100%",
            overFlowX: "hidden",
          }}
        >
          <Table
            sx={{ overFlowX: "hidden" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Coach</TableCell>
                <TableCell>Meeting Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
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
            "& .css-pdct74-MuiTablePagination-selectLabel": { display: "none" },
            "& .css-194a1fa-MuiSelect-select-MuiInputBase-input.MuiSelect-select":
              { display: "none" },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon ": {
              display: "none",
            },
            overflowX: "hidden",
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

export default UpcomingCoachingSessions;
