import React, { useState, useRef } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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

const Calendar = (props) => {
  const { handleDateChange, value, changeModalState } = props;
  // dummy data - need to populate dynamically
  const [dates, setDates] = useState([
    "Sat Nov 19 2022",
    "Wed Nov 23 2022",
    "Thu Nov 24 2022",
  ]);

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
        "& .MuiPickersStaticWrapper-staticWrapperRoot": {
          width: "100%",
        },
        "& .MuiPickersDatePickerRoot-toolbar ": {
          alignItems: "center",
          backgroundColor: "#08B2E3",
        },
        "& .MuiTypography-subtitle1": {
          color: "#fff",
        },
        "& .MuiPickersToolbarText-toolbarTxt": {
          color: "#fff",
        },
        "& .MuiPickersDay-daySelected": {
          backgroundColor: "#08B2E3",
        },
        "& .MuiPickersBasePicker-pickerView": {
          maxWidth: "100%",
        },
        "& .MuiPaper-root .MuiPickersCalendarHeader-switchHeader": {
          display: "flex",
          alignItems: "center",
        },
        " & .MuiPickersCalendarHeader-transitionContainer": {
          overflow: "visible",
        },
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation="portrait"
          variant="static"
          openTo="date"
          value={value}
          onChange={(e) => handleDateChange(e.toDateString())}
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            const date = day.toDateString();
            // console.log(date);

            const isSelected = isInCurrentMonth && dates.includes(date);

            // You can also use our internal <Day /> component
            return (
              <Badge
                key={day.toString()}
                badgeContent={
                  isSelected ? <CheckIcon color="success" /> : undefined
                }
                // color='secondary'
                overlap="circular"
              >
                {dayComponent}
              </Badge>
            );
          }}
        />
      </MuiPickersUtilsProvider>

      <ButtonGroup orientation="vertical">
        {isOpen && (
          <Box>
            <Grow in={true} timeout={1300}>
              <CustomIconButton
                sx={{
                  top: "48%",
                }}
                onClick={() => {
                  changeModalState({ type: "changeModalVisibility" });
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
                  changeModalState({ type: "changeModalVisibility" });
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
                  changeModalState({ type: "changeModalVisibility" });
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
                  changeModalState({ type: "changeModalVisibility" });
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
