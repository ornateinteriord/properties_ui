import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { getCloudinaryUrl, useCreateProperty } from "../../../api/product";
import { toast } from "react-toastify";
import { useGetPropertyTypes } from "../../../api/Property-Types";


const CreateProperty = ({ open, onClose }: { open: any; onClose: any }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedtype, setSelectedtype] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const createPropertyMutation = useCreateProperty();
  const cloudinary = getCloudinaryUrl();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    createPropertyMutation.mutate(formData);
    // onClose();
  };
  const { data: properties } = useGetPropertyTypes();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name: string; value: string }; 
    setFormData((prevData) => ({
      ...prevData,
      [name ?? "status"]: value,
    }));
    if (name === "property_type") {
      setSelectedtype(value);
    }
  
    if (name === "status") {
      setSelectedStatus(value);
    }
  };

  const filteredSubtypes =
  properties?.find((property: any) => property.type === selectedtype)
    ?.subTypes || [];
    const propertyTypesWithSubtypes = ["Land","Penthouse","Farmhouse","Studio Apartment","Commercial Space","Industrial Property",];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      cloudinary.mutate(file, {
        onSuccess: (data) => {
          console.log(data);
          setFormData((prevData: any) => ({
            ...prevData,
            image: data.secure_url,
          }));
        },
        onError: (err) => {
          toast.error("failed to uplaod image");
          console.log(err);
        },
      });
    }
  };

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
            flexDirection: "column",
            justifyContent: "space-between",
            gap: { xs: "15px", md: "20px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
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
                  name="property_type"
                  value={selectedtype || formData.property_type}
                  onChange={handleInputChange}
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
                  {properties?.map((property: any) => (
                    <MenuItem key={property.type} value={property.type}>
                      {`${property.type}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {propertyTypesWithSubtypes.includes(selectedtype) && (
                  <FormControl fullWidth>
                  <Select
                    required
                    displayEmpty
                    name="subtype"
                    value={formData.subtype || ""}
                    onChange={handleInputChange}
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
                            Select Subtype
                          </span>
                        );
                      }
                      return selected;
                    }}
                  >
                    {filteredSubtypes.map((subtype: string) => (
                      <MenuItem key={subtype} value={subtype}>
                        {subtype}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                label="Title"
                placeholder="ex: flat for sale."
                variant="outlined"
                sx={{ borderRadius: 2 }}
         
              />

              <TextField
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fullWidth
                label="Location"
                placeholder="Street/Area/City"
                required
                variant="outlined"
              />
              <TextField
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                fullWidth
                label="Bathrooms"
                type="number"
                variant="outlined"
              />

              <FormControl fullWidth>
                <Select
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleInputChange}
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
                  required
                  name="status"
                  value={selectedStatus || formData.status}
                  onChange={handleInputChange}
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
                  name="possession"
                  value={formData.possession}
                  onChange={handleInputChange}
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
              <TextField
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                label="Description"
                variant="outlined"
              />
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
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
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
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleInputChange}
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
                name="sqrtft"
                value={formData.sqft}
                onChange={handleInputChange}
                fullWidth
                label="Super Area (sqft)"
                type="number"
                required
                variant="outlined"
              />
              <TextField
                name="pricePerSqft"
                value={formData.pricePerSqft}
                onChange={handleInputChange}
                fullWidth
                label="Price per sqft"
                type="number"
                required
                variant="outlined"
              />
              <TextField
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                label="Price"
                type="number"
                required
                variant="outlined"
              />
              <FormControl>
                <FormLabel
                  sx={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "15px" }}
                >
                  Add Images
                </FormLabel>
                <Button variant="outlined" component="label">
                  Choose File
                  <input
                    type="file"
                    name="image"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </FormControl>
            </form>
          </Box>

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
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProperty;
