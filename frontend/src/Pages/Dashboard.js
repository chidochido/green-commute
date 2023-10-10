import * as React from "react";
import { useState } from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";

import { useJsApiLoader } from "@react-google-maps/api";

import Map from "../components/Map";
import Inputs from "../components/Inputs";

function Dashboard(props) {
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

  const submitHandler = (input) => {
    if (input.get("origin").length > 0 && input.get("destination").length > 0) {
      getDirections(input);
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
        <Inputs submitHandler={submitHandler} />
        <Typography>Distance: {distance} </Typography>
        <Typography>Duration: {duration} </Typography>
      </Box>
    </Stack>
  );
}

export default Dashboard;
