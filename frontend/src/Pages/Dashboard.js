import * as React from "react";
import { useState } from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";

import { useJsApiLoader } from "@react-google-maps/api";

import Map from "../components/Map";
import Inputs from "../components/Inputs";

function Dashboard(props) {
  // const transportTypes = [
  //   "biking",
  //   "electric_car",
  //   "electric_scooter",
  //   "gas_car",
  //   "public_transport",
  //   "walking",
  // ];

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
    if (
      input.get("transport") !== "biking" ||
      input.get("transport") !== "walking"
    ) {
      // TODO: make the api call and display the results as carbon footprint
      //let results = getCarbonFootprint(input);
      // this is because we already know biking and walking are 0. we can just display 0 without making a call.
    }

    /*
    input.get("origin"); = STRING containing the origin addr
    input.get("destination");  = STRING containing the destination addr
    input.get("transport");  = STRING containing the transport mode
    input.get("mileage");  = STRING containing the mileage >= "1" OR "N/A" if not entered.
    input.get("numPeople");  = STRING containing the number of people >= 1

    Strings for transport include:
    gas_car
    electric_car
    biking
    walking
    electric_scooter
    public_transport
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

      if (
        input.get("transport") !== "biking" ||
        input.get("transport") !== "walking"
      ) {
        // make the api call and display the results as carbon footprint
      } else {
        // dont make the api call but display 0 as carbon footprint
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCarbonFootprint = async (input) => {
    try {
      // TODO: make the api call and display the results as carbon footprint
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
