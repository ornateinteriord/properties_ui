import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const CreateProperty = ({ open, onClose }: { open: any; onClose: any }) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onClose();
  };

  const properties = [
    { name: "Apartment" },
    { name: "Land" },
    { name: "Site" },
    { name: "Villa" },
  ];
  const furnishing = [
    { name: "Fully Furnished" },
    { name: "Semi Furnished" },
    { name: "Unfurnished" },
  ];
  const bhk = [
    { name: "1 BHK" },
    { name: "2 BHK" },
    { name: "3 BHK" },
    { name: "4+ BHK" },
  ];
  const parking = [
    { name: "No Parking Space" },
    { name: "Bike Parking" },
    { name: "Bike & Car Parking" },
    { name: "Open Parking" },
    { name: "Garage Parking" },
    { name: "Basement Parking" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("");
  const status = [{ name: "Ready to Move" }, { name: "Under Construction" }];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          width: { xs: "100%" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Property
        <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: { xs: "15px", md: "20px" },
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "15px",
            }}
          >
            <FormControl fullWidth>
              <Select
                required
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#04112f",
                    },
                  },
                }}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "rgba(0,0,0,0.5)" }}>
                        Select Property Type
                      </span>
                    );
                  }
                  return selected;
                }}
              >
                {properties.map((fur) => (
                  <MenuItem key={fur.name} value={fur.name}>
                    {`${fur.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Title"
              placeholder="ex: flat for sale."
              required
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />

            <TextField
              fullWidth
              label="Location"
              placeholder="Street/Area/City"
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Super Area (sqft)"
              type="number"
              required
              variant="outlined"
            />
            <FormControl fullWidth>
              <Select
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#04112f",
                    },
                  },
                }}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "rgba(0,0,0,0.5)" }}>
                        Select BHK
                      </span>
                    );
                  }
                  return selected;
                }}
              >
                {bhk.map((bhk) => (
                  <MenuItem key={bhk.name} value={bhk.name}>
                    {`${bhk.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                value={selectedStatus}
                onChange={(e: any) => setSelectedStatus(e.target.value)}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#04112f",
                    },
                  },
                }}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "rgba(0,0,0,0.5)" }}>Status</span>
                    );
                  }
                  return selected;
                }}
              >
                {status.map((fur) => (
                  <MenuItem key={fur.name} value={fur.name}>
                    {`${fur.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedStatus === "Under Construction" && (
              <TextField
                fullWidth
                label="Expected Completion Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{
                  "input[type='date' i]": {
                    cursor: "pointer",
                  },
                }}
              />
            )}
             
          </form>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "15px",
            }}
          >
            {" "}
            <FormControl fullWidth>
              <Select
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#04112f",
                    },
                  },
                }}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "rgba(0,0,0,0.5)" }}>
                        Parking
                      </span>
                    );
                  }
                  return selected;
                }}
              >
                {parking.map((par) => (
                  <MenuItem key={par.name} value={par.name}>
                    {`${par.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <Select
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#04112f",
                    },
                  },
                }}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "rgba(0,0,0,0.5)" }}>
                        Select Furnished Type
                      </span>
                    );
                  }
                  return selected;
                }}
              >
                {furnishing.map((fur) => (
                  <MenuItem key={fur.name} value={fur.name}>
                    {`${fur.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Bathrooms"
              type="number"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Price per sqft"
              type="number"
              required
              variant="outlined"
            />
            <FormControl>
                <FormLabel sx={{ color: "rgba(0, 0, 0, 0.5)",fontSize:"15px" }}>Add Image</FormLabel>
                <Button variant="outlined" component="label">
                  Choose File
                  <input type="file" hidden  />
                </Button>
              
              </FormControl>
          </form>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 3 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#150b83c1",
            width: "110px",
            borderRadius: "30px",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#150b83",
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProperty;
