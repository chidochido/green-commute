import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";

import { Autocomplete } from "@react-google-maps/api";

function Inputs(props) {
  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.submitHandler(data);
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
        <Select labelId="label" id="select" value="default" sx={{ mt: 2, mb: 2 }}>
            <MenuItem value="default">Choose a Transport Type *</MenuItem>
            <MenuItem value="gas_car">Gas Car</MenuItem>
            <MenuItem value="electric_car">Electric Car</MenuItem>
            <MenuItem value="biking">Biking</MenuItem>
            <MenuItem value="walking">Walking</MenuItem>
            <MenuItem value="electric_scooter">E-Scooter</MenuItem>
            <MenuItem value="public_transport">Public Transport</MenuItem>
            <MenuItem value="carpool">Carpool</MenuItem>
        </Select>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
            Submit
        </Button>
    </Box>
  );
}

export default Inputs;
