import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { set } from "date-fns";

export default function FormDialog(props) {
  const { open, handleClickOpen, handleClose, modifiedDate, dropDownValue } =
    props;

  // state for form fields
  const [workoutDetails, setWorkoutDetails] = useState("");
  const [coachNotes, setCoachNotes] = useState("");
  const [athleteNotes, setAthleteNotes] = useState("");
  const [coachName, setCoachName] = useState("");
  const [meetingDetails, setMeetingDetails] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");

  // handle text input change
  const handleTextInputChange = (val, label) => {
    switch (label) {
      case "Enter workout details":
        setWorkoutDetails(val);
        break;
      case "Enter coach's notes":
        setCoachNotes(val);
        break;
      case "Enter athlete notes":
        setAthleteNotes(val);
        break;
      case "Enter coach name":
        setCoachName(val);
        break;
      case "Enter meeting details":
        setMeetingDetails(val);
        break;
      case "Enter event name":
        setEventName(val);
        break;
      default:
        console.log("default");
        setEventDetails(val);
    }
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Session/{modifiedDate}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              marginBottom: "1rem",
              minWidth: 120,
              "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "1.3rem",
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Select Workout Type
              </InputLabel>
              <NativeSelect
                defaultValue={dropDownValue}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={"Bike"}>Bike</option>
                <option value={"Run"}>Run</option>
                <option value={"Swim"}>Swim</option>
                <option value={"Weights"}>Weights</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <DialogContentText>Workout Details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter workout details"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "1.5rem" }}
            value={workoutDetails}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter workout details")
            }
          />
          <DialogContentText>Coach's Notes</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter coach's notes"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "1.5rem" }}
            value={coachNotes}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter coach's notes")
            }
          />
          <DialogContentText>Athlete's Notes</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter athlete notes"
            type="email"
            fullWidth
            variant="standard"
            sx={{
              marginBottom: "1.5rem",
            }}
            value={athleteNotes}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter athlete notes")
            }
          />
          <DialogContentText>Add Coaching Session</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter coach name"
            type="email"
            fullWidth
            variant="standard"
            value={coachName}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter coach name")
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter meeting details"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "1.5rem" }}
            value={meetingDetails}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter meeting details")
            }
          />
          <DialogContentText>Add Event</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter event name"
            type="email"
            fullWidth
            variant="standard"
            value={eventName}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter event name")
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter event details"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "1.5rem" }}
            value={eventDetails}
            onChange={(e) =>
              handleTextInputChange(e.target.value, "Enter event details")
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
