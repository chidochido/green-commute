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
  const signInLabel = loginMode ? "Sign in" : "Sign up";
  const newUserLabel = loginMode ? "New User?" : "Back to Sign in";

  const [pwdMatch, setPwdMatch] = useState(true);
  const pwdMatchLabel = pwdMatch ? "" : "Error: Invalid username or password";

  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
      retyped: data.get("retypedPassword"),
    });

    if (
      // input validation
      data.get("username").replace(/\s/g, "").length > 0 &&
      data.get("password").replace(/\s/g, "").length > 0 &&
      (loginMode ||
        data.get("password").replace(/\s/g, "") ===
          data.get("retypedPassword").replace(/\s/g, ""))
    ) {
      setPwdMatch(true);

      //Comment out when backend is connected
      console.log(data);
      navigate("/dashboard");

      // TODO: Connect with backend by replacing fetch parameter with
      // correct backend URL in these two handlers, and uncomment.
      //loginMode ? loginHandler(data) : signupHandler(data);
    } else {
      setPwdMatch(false);
    }
  };

  const loginHandler = async (input) => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.get("username"),
          password: input.get("password"),
        }),
      });
      console.log(await res.json());
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const signupHandler = async (input) => {
    try {
      const res = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.get("username"),
          password: input.get("password"),
          type: input.get("type"),
        }),
      });
      console.log(await res.json());
      setLoginMode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const switchModeHandler = () => {
    setLoginMode((loginMode) => !loginMode);
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
                {pwdMatchLabel}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {signInLabel}
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
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
