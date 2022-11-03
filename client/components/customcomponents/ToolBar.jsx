import React from "react";
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
const CustomToolBar = styled(Toolbar)({
  backgroundColor: "#F95738",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10px",
});

const StyledCustomToolBar = ({ value }) => {
  return (
    <CustomToolBar>
      <h2>{value.slice(11, 15)}</h2>
      <h2>{value.slice(0, 11)}</h2>
    </CustomToolBar>
  );
};

export default StyledCustomToolBar;
