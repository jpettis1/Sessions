import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button, TextField, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';

const SignUpForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLocalSignUp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/login/register', {
        username: userName,
        password: password
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpState = (val, label) => {
    switch (label) {
      case 'Username':
        setUserName(val);
        break;
      default:
        setPassword(val);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          padding: '10px',
          backgroundColor: '#EE6352'
        }}>
        <FitnessCenterIcon sx={{ color: '#fff' }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#fff',
            textDecoration: 'none'
          }}>
          Sessions
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: 'calc(100vh - 460px)',
          my: 20,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
        <Paper
          elevation={5}
          sx={{
            width: 360,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderRadius: 'sm',
            boxShadow: 'md'
          }}>
          <div className="login-header-div">
            <h2 className="login-header">Sign up</h2>
            <h5>Never miss a workout</h5>
          </div>
          <form onSubmit={handleLocalSignUp}>
            <Box sx={{ padding: '10px' }}>
              <TextField
                autoFocus
                margin="dense"
                label="Enter email address"
                fullWidth
                sx={{ marginBottom: '1rem' }}
                required={true}
                onChange={(e) => handleSignUpState(e.target.value, 'Username')}
                value={userName}
              />
              <TextField
                margin="dense"
                label="Enter password"
                fullWidth
                sx={{ marginBottom: '1rem' }}
                required={true}
                onChange={(e) => handleSignUpState(e.target.value)}
                value={password}
                type="password"
              />
            </Box>
            <Box sx={{ padding: '10px' }}>
              <Button
                sx={{
                  height: '4rem',
                  width: '100%',
                  marginBottom: '1rem',
                  backgroundColor: '#EE6352'
                }}
                variant="contained"
                type="submit">
                Sign up
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default SignUpForm;
