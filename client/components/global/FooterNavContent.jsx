import React from "react";
import { CustomFooterButton } from "../customcomponents/CustomFooterButton.jsx";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

const FooterNavContent = () => {
  return (
    <Box>
      <BottomNavigation
        className="bottom-nav"
        showLabels
        sx={{
          backgroundColor: "#757575",
          height: "100px",
        }}
      >
        <CustomFooterButton label="Contact Us" />
        <CustomFooterButton label="Find A Coach" />
        <CustomFooterButton label="Premium Membership" />
        <CustomFooterButton label="Training Resources" />
      </BottomNavigation>
    </Box>
  );
};

export default FooterNavContent;
