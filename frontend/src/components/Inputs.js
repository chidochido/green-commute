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
  const [mileage, setMileage] = useState("");
  const [numPeople, setNumPeople] = useState("");

  const handleDropdownChange = (event) => {
    setTransport(event.target.value);
  };

  const handleMileageChange = (event) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      if (parseInt(event.target.value) >= 1) {
        setMileage(parseInt(event.target.value));
      }
    } else {
      setMileage("");
    }
  };

  const handleNumPeopleChange = (event) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      if (parseInt(event.target.value) >= 1) {
        setNumPeople(parseInt(event.target.value));
      }
    } else {
      setNumPeople("");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);

    if (Number.isInteger(mileage) && mileage >= 1) {
      input.set("mileage", mileage);
    } else {
      input.set("mileage", "N/A");
    }

    if (Number.isInteger(numPeople) && numPeople >= 1) {
      input.set("numPeople", numPeople);
    } else {
      input.set("numPeople", 1);
    }

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
        labelId="transport"
        required
        id="transport"
        value={transport}
        label="transport"
        defaultValue="default"
        onChange={handleDropdownChange}
      >
        <MenuItem value="default">Choose a Transport Type *</MenuItem>
        <MenuItem value="biking">Biking</MenuItem>
        <MenuItem value="electric_car">Electric Car</MenuItem>
        <MenuItem value="electric_scooter">E-Scooter</MenuItem>
        <MenuItem value="gas_car">Gas Car</MenuItem>
        <MenuItem value="public_transport">Public Transport</MenuItem>
        <MenuItem value="walking">Walking</MenuItem>
      </Select>

      {(transport === "electric_car" || transport === "gas_car") && (
        <TextField
          margin="normal"
          fullWidth
          value={numPeople}
          onChange={handleNumPeopleChange}
          name="numPeople"
          label="Number of passengers (Optional)"
          id="numPeople"
        />
      )}
      {transport === "gas_car" && (
        <TextField
          margin="normal"
          fullWidth
          value={mileage}
          onChange={handleMileageChange}
          name="mileage"
          label="Mileage in MPG (Optional)"
          id="mileage"
        />
      )}
      {(transport === "electric_car" || transport === "electric_scooter") && (
        <TextField
          margin="normal"
          fullWidth
          value={mileage}
          onChange={handleMileageChange}
          name="mileage"
          label="Mileage in MPGe (Optional)"
          id="mileage"
        />
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Inputs;
