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

  const [results, setResults] = useState("");
  const [gasCarEmissions, setGasCarEmissions] = useState(0);

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
      input.get("transport") === "biking" ||
      input.get("transport") === "walking"
    ) {
      getGasCarFootprint(input);
      let tmp =
        "You will emit 0 kg of CO2e on this trip. You have saved " +
        Math.trunc(gasCarEmissions * 100) / 100 +
        " kg of C02 emissions by not driving a gas car. This is equivalent to " +
        Math.trunc((gasCarEmissions / 22) * 100) / 100 +
        " trees planted.";
      setResults(tmp);
    } else {
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
      input.set("distance", results.routes[0].legs[0].distance.value / 1609);
      getGasCarFootprint(input);
    } catch (err) {
      console.log(err);
    }
  };

  const getCarbonFootprint = async (input) => {
    try {
      const res = await fetch("URL", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance: input.get("distance"),
          password: input.get("password"),
        }),
      });
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  const getGasCarFootprint = async (input) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("distance", input.get("distance"));
      queryParams.append("passengers", input.get("numPeople"));
      const url = `https://project1cs3300.ue.r.appspot.com/emissionCalc/gas-car?${queryParams.toString()}`;
      console.log(url);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setGasCarEmissions(data);
        console.log("RETURNED: " + gasCarEmissions);
      } else {
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
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
        <Typography>{results} </Typography>
      </Box>
    </Stack>
  );
}

export default Dashboard;
