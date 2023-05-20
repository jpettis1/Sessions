import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import AthleteHomepage from './AthleteHomepage.jsx';
import FooterNavContent from './global/FooterNavContent.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpForm from './SignUp.jsx';
import '../stylesheets/styles.scss';
import { Box } from '@mui/material';

export const AppContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getUser = async () => {
      try {
        const response = await axios.get('login/auth/google/success', {
          signal: signal
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          console.log('request error occurred', err);
        }
      }
    };
    getUser();

    return () => {
      controller.abort();
    };
  }, []);

  const deleteUser = () => {
    setUser(false);
  };

  return (
    <AppContext.Provider
      value={{
        deleteUser,
        user
      }}>
      <Box>
        <Routes>
          <Route path="/dashboard" element={<AthleteHomepage />} />
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
        <FooterNavContent />
      </Box>
    </AppContext.Provider>
  );
};

export default App;
