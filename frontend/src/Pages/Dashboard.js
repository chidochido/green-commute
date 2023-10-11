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
    console.log(input);
    getDirections(input);

    /*
    input.get("origin"); = string containing the origin addr
    input.get("destination");  = string containing the destination addr
    input.get("transport");  = string containing the transport mode

    Strings for transport include:
    gas_car
    electric_car
    biking
    walking
    electric_scooter
    public_transport
    carpool
    */
  };

  const getDirections = async (input) => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: input.get("origin"),
        destination: input.get("destination"),
        travelMode: google.maps.TravelMode.DRIVING,
        // Don't change this ^ from driving to anything else; all we need is the distance.
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
          width: "60%",
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
