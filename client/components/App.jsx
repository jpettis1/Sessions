import React, { useState } from "react";
import ResponsiveAppBar from "./global/AppBar.jsx";
import AthleteHomepage from "./AthleteHomepage.jsx";
import FooterNavContent from "./global/FooterNavContent.jsx";
// Import scss file
import "../stylesheets/styles.scss";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <AthleteHomepage />
      <FooterNavContent />
    </Box>
  );
};

export default App;
