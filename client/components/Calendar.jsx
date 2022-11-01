import React, { useState, useRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  Box,
  Badge,
  TextField,
  ButtonGroup,
  Button,
  Collapse,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import CheckIcon from "@mui/icons-material/Check";

const Calendar = () => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // const stateVal = isOpen === false ? true : false;
    setIsOpen((prev) => (prev === false ? true : false));
  };

  return (
    <Box
      sx={{
        position: "relative",
        margin: "0 1vw",
        ".css-u0soqy-MuiPickerStaticWrapper-root": {
          boxShadow: "3px 2px 10px 2px #888888",
        },
        ".css-1hbyad5-MuiTypography-root": { display: "none" },
        ".css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root": {
          padding: 0,
        },
        ".css-hq2kpw-MuiGrid-root-MuiPickersToolbar-content": {
          justifyContent: "center",
          padding: "1rem",
          backgroundColor: "#ee964b",
        },
        ".css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected ": {
          backgroundColor: "#ee964b",
        },

        ".css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root .MuiPickersToolbar-penIconButton":
          { display: "none" },
        ".css-hlj6pa-MuiDialogActions-root": { display: "none" },
      }}
    >
      <h2 className="header-text">Calendar</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          openTo="day"
          orientation="portrait"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.getDate()) > 0;

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  isSelected ? <CheckIcon color="success" /> : undefined
                }
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
      <ButtonGroup placement="vertical">
        <Collapse in={isOpen} orientation="vertical">
          <Button
            sx={{
              position: "absolute",
              top: "350px",
              right: "20px",
            }}
            variant="text"
          >
            <DeleteIcon />
          </Button>
        </Collapse>
        <Fab
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: "400px",
            right: "20px",
            backgroundColor: "#ee964b",
          }}
          size="small"
        >
          <AddIcon />
        </Fab>
      </ButtonGroup>
    </Box>
  );
};

export default Calendar;
