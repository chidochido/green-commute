import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function AuthPage() {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState(true);
  const signInLabel = loginMode ? "Sign In" : "Sign Up";
  const newUserLabel = loginMode ? "New User?" : "Back to Sign In";

  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      // input validation
      data.get("username").replace(/\s/g, "").length > 0 &&
      data.get("password").replace(/\s/g, "").length > 0 &&
      (loginMode ||
        data.get("password").replace(/\s/g, "") ===
          data.get("retypedPassword").replace(/\s/g, ""))
    ) {
      setError("");
      loginMode ? loginHandler(data) : signupHandler(data);
    } else {
      setError("Invalid username or password.");
    }
  };

  const loginHandler = async (input) => {
    try {
      const res = await fetch(
        "https://project1cs3300.ue.r.appspot.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.get("username"),
            password: input.get("password"),
          }),
        }
      );
      let status = await res.json();
      if (status.message) {
        setError("Invalid username or password.");
      } else {
        console.log("SUCCESS");
        setError("");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password.");
      console.log(err);
    }
  };

  const signupHandler = async (input) => {
    try {
      const res = await fetch(
        "https://project1cs3300.ue.r.appspot.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: input.get("username"),
            password: input.get("password"),
          }),
        }
      );
      let status = await res.json();
      if (status.message === "user already exists") {
        console.log(status);
        setError("User already exists.");
      } else {
        console.log("SUCCESS");
        setError("");
        setLoginMode(true);
      }
    } catch (err) {
      setError("User already exists.");
      console.log(err);
    }
  };

  const switchModeHandler = () => {
    setLoginMode((loginMode) => !loginMode);
    setError("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          items
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.publicdomainpictures.net/pictures/360000/velka/blue-sky-background-with-clouds-1596445203nMi.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h2" variant="h2" color="green">
              <strong>Green 🌿 Commute</strong>
            </Typography>
          </Box>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h6" variant="h6">
              {signInLabel}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              {!loginMode && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="retypedPassword"
                  label="Retype Password"
                  type="password"
                  id="retypedPassword"
                />
              )}

              <Typography component="h8" variant="h8" color="red">
                {error}
              </Typography>

              <Button
                type="submit"
                style={{ background: "green" }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {signInLabel}
              </Button>
            </Box>

            <Button
              type="submit"
              style={{ color: "green" }}
              variant="text"
              onClick={switchModeHandler}
            >
              {newUserLabel}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
