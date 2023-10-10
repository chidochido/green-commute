import { Box, Button, TextField } from "@mui/material";

import { Autocomplete } from "@react-google-maps/api";

function Inputs(props) {
  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.submitHandler(data);
  };

  return (
    <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
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
