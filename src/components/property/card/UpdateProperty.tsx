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
import { getCloudinaryUrl, useUpdateProperty } from "../../../api/product";
import { toast } from "react-toastify";
import { useGetPropertyTypes } from "../../../api/Property-Types";
import { LoadingComponent } from "../../../App";
import { Product } from "../../../types";
import DistrictTalukSelector from "../../ui/DistrictTalukSelector";

const UpdateProperty = ({ open, onClose , property }: { open: any; onClose: any , property: Product}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedtype, setSelectedtype] = useState("");
  const [formData, setFormData] = useState<Product>(property);
  const updateProperty = useUpdateProperty(property._id);
  const { mutate, isPending } = updateProperty;

  const [districtSearchTerm, setDistrictSearchTerm] = useState("");
  const [talukSearchTerm, setTalukSearchTerm] = useState("");

  const cloudinary = getCloudinaryUrl();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      district: districtSearchTerm,
      taluk: talukSearchTerm,
    };
    mutate(updatedFormData);
    onClose();
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
      [name ?? "propertyStatus"]: value,
    }));

    if (name === "property_type") {
      setSelectedtype(value);
    }


    if (name === "propertyStatus") {
      setSelectedStatus(value);
    }
  };

  const filteredSubtypes =
    properties?.find((property: any) => property.type === selectedtype)
      ?.subTypes || [];

  const propertyTypesWithSubtypes = [
    "Land",
    "Penthouse",
    "Farmhouse",
    "Studio Apartment",
    "Commercial Space",
    "Industrial Property",
  ];

  const shouldHideFields =
    (propertyTypesWithSubtypes.includes(selectedtype) &&
      selectedtype !== "Penthouse" &&
      selectedtype !== "Farmhouse") ||
    selectedtype === "Site";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      cloudinary.mutate(file, {
        onSuccess: (data) => {
          setFormData((prevData: any) => ({
            ...prevData,
            image: data.secure_url,
          }));
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Error uploading image");
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

  const propertyStatus = [
    { name: "Ready to Move" },
    { name: "Under Construction" },
  ];

   // Handle district change
   const handleDistrictChange = (district: string) => {
    setDistrictSearchTerm(district);
    setFormData((prevData) => ({
      ...prevData,
      district,
    }));
  };

  // Handle taluk change
  const handleTalukChange = (taluk: string) => {
    setTalukSearchTerm(taluk);
    setFormData((prevData) => ({
      ...prevData,
      taluk,
    }));
  };

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
        Update Property
        <IconButton onClick={()=>{
          onClose()
        }} sx={{ color: "text.secondary" }}>
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
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                label="Address"
                placeholder="area/street/"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <FormControl fullWidth>
                <Select
                  name="state"
                  value={formData.state}
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
                        <span style={{ color: "rgba(0,0,0,0.5)" }}>State</span>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="karnataka">Karnataka</MenuItem>
                </Select>
              </FormControl>
               <DistrictTalukSelector
                onDistrictChange={handleDistrictChange}
                onTalukChange={handleTalukChange}
                districtValue={districtSearchTerm}
                talukValue={talukSearchTerm}
              />

              {!shouldHideFields && (
                <TextField
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  fullWidth
                  label="Bathrooms"
                  type="number"
                  variant="outlined"
                />
              )}
              {!shouldHideFields && (
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
              )}

              <FormControl fullWidth>
                <Select
                  required
                  name="propertyStatus"
                  value={selectedStatus || formData.propertyStatus}
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
                          Property Status
                        </span>
                      );
                    }
                    return selected;
                  }}
                >
                  {propertyStatus.map((x) => (
                    <MenuItem key={x.name} value={x.name}>
                      {`${x.name}`}
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
              {!shouldHideFields && (
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
              )}
              {!shouldHideFields && (
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
                    {furnishing.map((x) => (
                      <MenuItem key={x.name} value={x.name}>
                        {`${x.name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                onBlur={() => {
                  if (formData.price && formData.sqft) {
                    setFormData((prevData) => ({
                      ...prevData,
                      pricePerSqft: (Number(formData.price) / Number(formData.sqft)).toFixed(2),
                    }));
                  } else if (formData.sqft && formData.pricePerSqft) {
                    setFormData((prevData) => ({
                      ...prevData,
                      price: (Number(formData.sqft) * Number(formData.pricePerSqft)).toFixed(2),
                    }));
                  }
                }}
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
                onBlur={() => {
                  if (formData.sqft && formData.pricePerSqft) {
                    setFormData((prevData) => ({
                      ...prevData,
                      price: (Number(formData.sqft) * Number(formData.pricePerSqft)).toFixed(2),
                    }));
                  } else if (formData.price && formData.pricePerSqft) {
                    setFormData((prevData) => ({
                      ...prevData,
                      sqft: (Number(formData.price) / Number(formData.pricePerSqft)).toFixed(2),
                    }));
                  }
                }}
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
                onBlur={() => {
                  if (formData.sqft && formData.price) {
                    setFormData((prevData) => ({
                      ...prevData,
                      pricePerSqft: (Number(formData.price) / Number(formData.sqft)).toFixed(2),
                    }));
                  } else if (formData.price && formData.pricePerSqft) {
                    setFormData((prevData) => ({
                      ...prevData,
                      sqft: (Number(formData.price) / Number(formData.pricePerSqft)).toFixed(2),
                    }));
                  }
                }}
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
            Update
          </Button>
        </Box>
      </DialogContent>
     
      {(isPending || cloudinary.isPending) && <LoadingComponent />}
    </Dialog>
  );
};

export default UpdateProperty;
