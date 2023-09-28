import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import { Stack, Box, Divider } from "@mui/material";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

function DashboardLayout(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_JS_API_KEY,
  });

  if (!isLoaded) {
  }

  return (
    <Stack
      direction="row"
      spacing={0}
      divider={
        <Divider orientation="vertical" flexItem sx={{ width: "0.1vw" }} />
      }
    >
      {!isLoaded && (
        <Box sx={{ bgcolor: "red", height: "100vh", width: "100vw" }}></Box>
      )}
      {isLoaded && (
        <Box sx={{ bgcolor: "grey", height: "100vh", width: "100vw" }}>
          <GoogleMap></GoogleMap>
        </Box>
      )}

      <Box sx={{ bgcolor: "blue", height: "100vh", width: "100vw" }} />
    </Stack>
  );
}

export default DashboardLayout;
