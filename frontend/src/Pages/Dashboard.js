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
  const [distance, setDistance] = useState(0);

  const [results, gotResults] = useState(false);
  const [emissions, setEmissions] = useState(0);
  const [baselineEmissions, setBaselineEmissions] = useState(0);
  const [label, setLabel] = useState("by not driving a gas car");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_JS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return "LOADING";
  }

  const submitHandler = async (input) => {
    console.log(input);
    await getDirections(input);
    if (
      input.get("transport") === "biking" ||
      input.get("transport") === "walking"
    ) {
      // let tmp =
      //   "You will emit 0 kg of CO2e on this trip. You have saved " +
      //   Math.trunc(gasCarEmissions * 100) / 100 +
      //   " kg of C02 emissions by not driving a gas car. This is equivalent to " +
      //   Math.trunc((gasCarEmissions / 22) * 100) / 100 +
      //   " trees planted.";
      gotResults(true);
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
      input.set("distance", results.routes[0].legs[0].distance.value / 1609);
      if (input.get("transport") === "gas-car") {
        setLabel("by carpooling in a gas car");
      } else {
        setLabel("by not driving a gas car");
      }
      if (
        input.get("transport") !== "walking" &&
        input.get("transport") !== "biking"
      ) {
        await getFootprint(input, input.get("transport"));
      } else {
        setEmissions(0);
      }
      await getBaselineFootprint(input);
    } catch (err) {
      console.log(err);
    }
  };

  const getFootprint = async (input, type) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("distance", input.get("distance"));
      queryParams.append("passengers", input.get("numPeople"));
      const url = `https://project1cs3300.ue.r.appspot.com/emissionCalc/${type}?${queryParams.toString()}`;
      console.log(url);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setEmissions(Math.trunc(data * 100) / 100);
      } else {
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // baseline is gas-car with 1 person
  const getBaselineFootprint = async (input) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("distance", input.get("distance"));
      queryParams.append("passengers", 1);
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
        setBaselineEmissions(Math.trunc(data * 100) / 100);
        console.log(data);
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
        {results && (
          <Typography paddingTop={"25px"}>
            You will emit {emissions} kg of CO2 on this trip.
          </Typography>
        )}
        {emissions < baselineEmissions && (
          <Typography paddingTop={"25px"}>
            You have saved{" "}
            {Math.trunc((baselineEmissions - emissions) * 100) / 100} kg of C02
            emissions {label}. This is equivalent to{" "}
            {Math.trunc((baselineEmissions / 22) * 100) / 100} trees planted
            over a year.
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default Dashboard;
