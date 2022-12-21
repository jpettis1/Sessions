import React, { useState, useContext } from "react";
import { AthleteHomePageContext } from "./AthleteHomepage.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import DateFnsUtils from "@date-io/date-fns";
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

const Calendar = () => {
  const { value, handleDateChange, changeModalState } = useContext(
    AthleteHomePageContext
  );

  const [isOpen, setIsOpen] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);

  const handleClick = () => {
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
      className="Calendar"
      elevation={5}
      onClick={handleClick}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "Center",
        ".css-u0soqy-MuiPickerStaticWrapper-root ": {
          width: "100%",
        },
        "& .css-1eurbeq-MuiPickersToolbar-root-MuiDatePickerToolbar-root": {
          backgroundColor: "#08B2E3",
          color: "#fff",
        },

        "& .css-1hbyad5-MuiTypography-root": {
          display: "none",
        },
        "& .css-z3au5x-MuiButtonBase-root-MuiIconButton-root-MuiPickersToolbar-penIconButton":
          {
            display: "none",
          },
        "& .css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title": {
          width: "100%",
        },
        "& .css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon":
          {
            display: "none",
          },
        "& .css-hlj6pa-MuiDialogActions-root": {
          display: "none",
        },
        "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
          backgroundColor: "#08B2E3",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          // orientation="landscape"
          openTo="day"
          value={value}
          onChange={(e) => {
            handleDateChange(e.toDateString());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <ButtonGroup orientation="vertical">
        {isOpen && (
          <Box>
            <Grow in={true} timeout={1300}>
              <CustomIconButton
                sx={{
                  top: "48%",
                }}
                onClick={() => {
                  changeModalState({
                    type: "changeModalVisibility",
                  });
                  changeModalState({ type: "setWorkoutType", payload: "Run" });
                }}
              >
                <DirectionsRunIcon />
              </CustomIconButton>
            </Grow>
            <Grow in={true} timeout={1300}>
              <CustomIconButton
                sx={{
                  top: "58%",
                }}
                onClick={() => {
                  changeModalState({
                    type: "changeModalVisibility",
                  });
                  changeModalState({ type: "setWorkoutType", payload: "Bike" });
                }}
              >
                <DirectionsBikeIcon />
              </CustomIconButton>
            </Grow>
            <Grow in={true} timeout={1300}>
              <CustomIconButton
                sx={{
                  top: "68%",
                }}
                onClick={() => {
                  changeModalState({
                    type: "changeModalVisibility",
                  });
                  changeModalState({ type: "setWorkoutType", payload: "Swim" });
                }}
              >
                <PoolIcon />
              </CustomIconButton>
            </Grow>
            <Grow in={true} timeout={1300}>
              <CustomIconButton
                sx={{
                  top: "78%",
                }}
                onClick={() => {
                  changeModalState({
                    type: "changeModalVisibility",
                  });
                  changeModalState({
                    type: "setWorkoutType",
                    payload: "Weights",
                  });
                }}
              >
                <FitnessCenterIcon />
              </CustomIconButton>
            </Grow>
          </Box>
        )}
        <Fab
          onMouseEnter={handleChangeIcon}
          onMouseLeave={handleChangeIcon}
          sx={{
            position: "absolute",
            right: "2%",
            top: "88%",
            backgroundColor: "#08B2E3",
          }}
          size="small"
          onClick={handleClick}
        >
          {!changeIcon ? <AddIcon sx={{ color: "#fff" }} /> : <EditIcon />}
        </Fab>
      </ButtonGroup>
      {/* </LocalizationProvider> */}
    </Paper>
  );
};

export default Calendar;
