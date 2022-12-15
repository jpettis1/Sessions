import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const LoginPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          padding: "10px",
          backgroundColor: "#EE6352",
        }}
      >
        <FitnessCenterIcon sx={{ color: "#fff" }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Sessions
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 460px)",
          my: 20,
          mx: "auto", // margin left & right
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: 360,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div className="login-header-div">
            <h2 className="login-header">Sign in</h2>
            <h5>Never miss a workout</h5>
          </div>
          <Box sx={{ padding: "10px" }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Enter workout details"
              fullWidth
              // variant="standard"
              sx={{ marginBottom: "1rem" }}
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Enter workout details"
              fullWidth
              // variant="standard"
              sx={{ marginBottom: "1rem" }}
              required={true}
            />
            <a className="forgot-password" href="#">
              Forgot password?
            </a>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Button
              sx={{
                height: "4rem",
                width: "100%",
                marginBottom: "1rem",
                backgroundColor: "#EE6352",
              }}
              variant="contained"
            >
              Sign in
            </Button>
            <hr />
            <Button
              sx={{ height: "4rem", width: "100%" }}
              variant="contained"
              href="auth/google"
            >
              Log in with Google
            </Button>
          </Box>
        </Paper>
        <p className="sign-up-link">
          New to Sessions? <a href="#">Sign Up</a>
        </p>
      </Box>
    </Box>
  );
};

export default LoginPage;
