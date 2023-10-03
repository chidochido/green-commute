import * as React from "react";
import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  Switch,
  ButtonGroup,
  IconButton,
} from "@mui/material";

import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  Autocomplete,
  TravelMode,
  DirectionsService,
} from "@react-google-maps/api";

function DashboardLayout(props) {
  const center = { lat: 33.772378580982, lng: -84.39474039330827 }; // Tech Tower

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBsxXEYE5kI-dbUcawTa85-jmL3CGsC2EQ",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return "LOADING";
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: "DRIVING",
    });
    setDirectionsResponse(results);
    console.log(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <Stack
      direction="row"
      spacing={0}
      divider={
        <Divider orientation="vertical" flexItem sx={{ width: "0.1vw" }} />
      }
    >
      <Box sx={{ bgcolor: "grey", height: "100vh", width: "100vw" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
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
        <Box component="form" sx={{ mt: 1 }}>
          <Box
            p={4}
            borderRadius="lg"
            m={4}
            bgColor="white"
            shadow="base"
            minW="container.md"
            zIndex="1"
          >
            <div spacing={2} justifyContent="space-between">
              <Box flexGrow={1}>
                <Autocomplete>
                  <TextField type="text" placeholder="Origin" ref={originRef} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <TextField
                    type="text"
                    placeholder="Destination"
                    ref={destinationRef}
                  />
                </Autocomplete>
              </Box>

              <ButtonGroup>
                <Button
                  colorScheme="pink"
                  type="submit"
                  onClick={calculateRoute}
                >
                  Calculate Route
                </Button>
                <IconButton aria-label="center back" onClick={clearRoute} />
              </ButtonGroup>
            </div>
            <div spacing={4} mt={4} justifyContent="space-between">
              <Typography>Distance: {distance} </Typography>
              <Typography>Duration: {duration} </Typography>
              <IconButton
                aria-label="center back"
                isRound
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              />
            </div>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export default DashboardLayout;
