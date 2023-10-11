import { useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Autocomplete } from "@react-google-maps/api";

function Inputs(props) {
  const [transport, setTransport] = useState("default");

  const handleChange = (event) => {
    setTransport(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    if (
      input.get("origin").length > 0 &&
      input.get("destination").length > 0 &&
      transport &&
      transport !== "default"
    ) {
      input.append("transport", transport);
      props.submitHandler(input);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={submitHandler} width={"80%"}>
      <Typography
        component="h3"
        variant="h3"
        color="green"
        align="center"
        mb={"30px"}
      >
        <strong>Green 🌿 Commute</strong>
      </Typography>
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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={transport}
        label="Age"
        defaultValue="default"
        onChange={handleChange}
      >
        <MenuItem value="default">Choose a Transport Type *</MenuItem>
        <MenuItem value="biking">Biking</MenuItem>
        <MenuItem value="carpool">Carpool</MenuItem>
        <MenuItem value="electric_car">Electric Car</MenuItem>
        <MenuItem value="electric_scooter">E-Scooter</MenuItem>
        <MenuItem value="gas_car">Gas Car</MenuItem>
        <MenuItem value="public_transport">Public Transport</MenuItem>
        <MenuItem value="walking">Walking</MenuItem>
      </Select>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Inputs;
