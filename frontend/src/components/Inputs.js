import { Box, Button, TextField, Typography } from "@mui/material";

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

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Inputs;
