import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLocalLogin = async () => {
    try {
      const response = await axios.post("/login", {
        username: userName,
        password: password,
      });
      if (response.data.user) {
        console.log("user data", response.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("user does not exist", err);
    }
  };

  const handleLoginState = (val, label) => {
    switch (label) {
      case "Username":
        setUserName(val);
        break;
      default:
        setPassword(val);
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

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
              // id="username"
              label="Enter username"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required={true}
              onChange={(e) => handleLoginState(e.target.value, "Username")}
              value={userName}
            />
            <TextField
              margin="dense"
              // id="password"
              label="Enter password"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required={true}
              onChange={(e) => handleLoginState(e.target.value)}
              value={password}
              type="password"
            />
            <a className="forgot-password" href="#" onClick={navigateToSignUp}>
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
              onClick={handleLocalLogin}
            >
              Sign in
            </Button>
            <hr />
            <Button
              sx={{
                height: "4rem",
                width: "100%",
                position: "relative",
                backgroundColor: "#4285F4",
              }}
              variant="contained"
              href="/login/auth/google"
            >
              <img
                className="googlebtn"
                src="assets/images/googlebtn.png"
                alt=""
              />
              <p className="google-sign-in-text">Sign in with Google</p>
            </Button>
          </Box>
        </Paper>
        <p className="sign-up-link">
          New to Sessions?{" "}
          <a href="#" onClick={navigateToSignUp}>
            Sign Up
          </a>
        </p>
      </Box>
    </Box>
  );
};

export default LoginPage;
