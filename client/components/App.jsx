import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ResponsiveAppBar from "./global/AppBar.jsx";
import AthleteHomepage from "./AthleteHomepage.jsx";
import FooterNavContent from "./global/FooterNavContent.jsx";
import LoginPage from "./LoginPage.jsx";
// Import scss file
import "../stylesheets/styles.scss";
import { Box } from "@mui/material";

const App = () => {
  const [user, setUser] = useState("t");
  return (
    <Box>
      <Routes>
        <Route
          path="/"
          element={user ? <AthleteHomepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
      <FooterNavContent />
    </Box>
  );
};

export default App;
