import * as React from "react";
import { useState } from "react";
import {
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import Map from "./Map";

function DashboardLayout(props) {
  const google = window.google;
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_JS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return "LOADING";
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("origin").length > 0 && data.get("destination").length > 0) {
      getDirections(data);
    }
  };

  const getDirections = async (input) => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: input.get("origin"),
        destination: input.get("destination"),
        travelMode: "DRIVING",
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      divider={
        <Divider orientation="vertical" flexItem sx={{ width: "0.1vw" }} />
      }
    >
      <Box sx={{ bgcolor: "grey", height: "100vh", width: "100vw" }}>
        <Map directionsResponse={directionsResponse} />
      </Box>

      <Box
        sx={{
          bgcolor: "white",
          height: "100vh",
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 1 }}
        >
          <Autocomplete>
            <TextField
              margin="normal"
              required
              fullWidth
              id="origin"
              label="Origin"
              name="origin"
            />
          </Autocomplete>
          <Autocomplete>
            <TextField
              margin="normal"
              required
              fullWidth
              name="destination"
              label="Destination"
              id="destination"
            />
          </Autocomplete>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Typography>Distance: {distance} </Typography>
        <Typography>Duration: {duration} </Typography>
      </Box>
    </Stack>
  );
}

export default DashboardLayout;
