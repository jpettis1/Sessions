import React, { useState, useRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import StyledCustomToolBar from "./customcomponents/ToolBar.jsx";
import {
  Box,
  Badge,
  TextField,
  ButtonGroup,
  IconButton,
  Grow,
  Paper,
} from "@mui/material";
import { CustomIconButton } from "./customcomponents/customiconbutton.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CheckIcon from "@mui/icons-material/Check";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { flexbox } from "@mui/system";

const Calendar = ({ handleDateChange, value }) => {
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);

  const handleClick = () => {
    // const stateVal = isOpen === false ? true : false;
    if (isOpen === true) {
      setIsOpen(false);
      setChangeIcon(false);
    }
  };

  const handleChangeIcon = () => {
    if (changeIcon === true && isOpen === false) {
      setChangeIcon(false);
    } else {
      setChangeIcon(true);
      setIsOpen(true);
    }
  };

  return (
    <Paper
      elevation={5}
      onClick={handleClick}
      sx={{
        position: "relative",
        ".css-1hbyad5-MuiTypography-root": { display: "none" },
        ".css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root": {
          padding: 0,
          // display: "flex",
          // justifyContent: "center",
        },
        ".css-hq2kpw-MuiGrid-root-MuiPickersToolbar-content": {
          justifyContent: "center",
          padding: "1rem",
          backgroundColor: "#F95738",
        },
        ".css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected ": {
          backgroundColor: "#F95738",
        },
        ".css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root .MuiPickersToolbar-penIconButton":
          { display: "none" },
        ".css-hlj6pa-MuiDialogActions-root": { display: "none" },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          ToolbarComponent={() => (
            <StyledCustomToolBar value={value.toString()} />
          )}
          displayStaticWrapperAs="mobile"
          openTo="day"
          orientation="portrait"
          value={value}
          onChange={(newValue) => {
            handleDateChange(newValue);
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
        <ButtonGroup orientation="vertical">
          {isOpen && (
            <Box>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "28%",
                  }}
                >
                  <DirectionsRunIcon />
                </CustomIconButton>
              </Grow>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "38%",
                  }}
                >
                  <DirectionsBikeIcon />
                </CustomIconButton>
              </Grow>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "48%",
                  }}
                >
                  <PoolIcon />
                </CustomIconButton>
              </Grow>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "58%",
                  }}
                >
                  <FitnessCenterIcon />
                </CustomIconButton>
              </Grow>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "68%",
                  }}
                >
                  <EditIcon />
                </CustomIconButton>
              </Grow>
              <Grow in={true} timeout={1300}>
                <CustomIconButton
                  sx={{
                    top: "78%",
                  }}
                >
                  <DeleteIcon />
                </CustomIconButton>
              </Grow>
            </Box>
          )}
          <Fab
            onMouseEnter={handleChangeIcon}
            onMouseLeave={handleChangeIcon}
            sx={{
              position: "absolute",
              right: "1%",
              top: "88%",
              backgroundColor: "#F95738",
            }}
            size="small"
            onClick={handleClick}
          >
            {!changeIcon ? <AddIcon /> : <EditIcon />}
          </Fab>
        </ButtonGroup>
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
