import React, { useContext } from 'react';
import { AthleteHomePageContext } from './AthleteHomepage.jsx';
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
  Checkbox,
  FormControlLabel
} from '@mui/material';

export default function FormDialog() {
  // props passed down from AthleteHOmePageContext
  const {
    open,
    modifiedDate,
    workoutValue,
    changeModalState,
    workoutDetails,
    athleteNotes,
    handleTextInputChange,
    resetForm,
    handleSubmission,
    workoutComplete
  } = useContext(AthleteHomePageContext);

  return (
    <div>
      <Dialog fullWidth open={open} onClose={resetForm}>
        <DialogTitle>Add Session/{modifiedDate}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              handleSubmission(e);
            }}>
            <Box
              sx={{
                marginBottom: '1rem',
                minWidth: 120,
                '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '1.3rem'
                }
              }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Select Workout Type
                </InputLabel>
                <NativeSelect
                  defaultValue={workoutValue}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native'
                  }}
                  onChange={(e) =>
                    changeModalState({
                      type: 'setWorkoutType',
                      payload: e.target.value
                    })
                  }>
                  <option value={'Bike'}>Bike</option>
                  <option value={'Run'}>Run</option>
                  <option value={'Swim'}>Swim</option>
                  <option value={'Weights'}>Weights</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <DialogContentText>Workout Details</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter workout details"
              fullWidth
              variant="standard"
              sx={{ marginBottom: '1.5rem' }}
              value={workoutDetails}
              onChange={(e) => handleTextInputChange(e.target.value, 'Enter workout details')}
              required={true}
            />
            <DialogContentText>Athlete's Notes</DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Enter athlete notes"
              fullWidth
              variant="standard"
              sx={{
                marginBottom: '1.5rem'
              }}
              value={athleteNotes}
              onChange={(e) => handleTextInputChange(e.target.value, 'Enter athlete notes')}
              required={true}
            />
            <FormControlLabel
              control={<Checkbox onChange={handleTextInputChange} checked={workoutComplete} />}
              label="Workout Complete"
            />
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  handleSubmission(e, true);
                }}>
                Delete
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
