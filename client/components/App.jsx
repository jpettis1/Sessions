import React, { useState } from "react";
import AthleteHomepage from "./AthleteHomepage.jsx";
import "../stylesheets/styles.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./global/AppBar.jsx";
const App = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <AthleteHomepage />
    </Box>
  );
};

export default App;
