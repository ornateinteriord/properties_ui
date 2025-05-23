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
import { useState, useEffect } from "react";
import {
  getCloudinaryUrl,
  useCreateProperty,
  useDeleteImage,
  useUpdateProperty,
} from "../../../api/product";
import { toast } from "react-toastify";
import { useGetPropertyTypes } from "../../../api/Property-Types";
import { LoadingComponent } from "../../../App";
import { Product } from "../../../types";
import DistrictTalukSelector from "../../ui/DistrictTalukSelector";
import { LocationDialog } from "../../../pages/Maps/LocationPicker";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import ImagesList from "./ImagesList";

interface PropertyFormProps {
  open: boolean;
  onClose: () => void;
  mode: "post" | "update";
  property?: Product | any; // Optional, only used in "update" mode
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  open,
  onClose,
  mode,
  property,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedtype, setSelectedtype] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]); // For newly uploaded images
  const [existingImages, setExistingImages] = useState<string[]>([]); // For existing images from database
  const [location, setLocation] = useState<{
    type: string;
    coordinates: [number, number];
  }>({
    type: "Point",
    coordinates: [0, 0], // Default coordinates
  });
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [loactionDialog, setLoactionDialog] = useState(false);
  const [formData, setFormData] = useState<Product | any>({});

  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty(property?._id || "");
  const { mutate: createMutate, isPending: isCreatePending } =
    createPropertyMutation;
  const { mutate: updateMutate, isPending: isUpdatePending } =
    updatePropertyMutation;

  const [districtSearchTerm, setDistrictSearchTerm] = useState("");
  const [talukSearchTerm, setTalukSearchTerm] = useState("");

  const cloudinary = getCloudinaryUrl();

  const handleCloseLocation = () => {
    setLoactionDialog(false);
  };

  const { data: properties } = useGetPropertyTypes();
  const deletePropertyImage = useDeleteImage()
  const handleLocationSelect = (lat: number, lng: number) => {
    const newLocation: any = {
      type: "Point",
      coordinates: [lng, lat], // MongoDB expects [longitude, latitude]
    };
    setLocation(newLocation);
    setFormData((prevData: any) => ({
      ...prevData,
      location: newLocation,
    }));
    setSelectedLocation([lat, lng]); // For display, we use [latitude, longitude]
  };
  // Initialize selectedtype and selectedStatus when in update mode
  useEffect(() => {
    if (mode === "update" && property) {
      setFormData({ ...property });
      setSelectedtype(property.property_type || "");
      setSelectedStatus(property.propertyStatus || "");
      setDistrictSearchTerm(property.district || "");
      setExistingImages(property.images || []);
      setTalukSearchTerm(property.taluk || "");
      if (property.location?.coordinates) {
        // Set the location coordinates (swapping to [lat, lng] for display)
        setLocation(property.location);
        setSelectedLocation([
          property.location.coordinates[1], // latitude
          property.location.coordinates[0]  // longitude
        ]);
      }
    } else {
      // Reset form for new property
      setFormData({});
      setSelectedtype("");
      setSelectedStatus("");
      setDistrictSearchTerm("");
      setTalukSearchTerm("");
      setSelectedLocation(null);
      setNewImages([]);
      setExistingImages([]);
    }
  }, [open, property, mode]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      district: districtSearchTerm,
      taluk: talukSearchTerm,
    };

    if (mode === "post") {
      createMutate(updatedFormData, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "update") {
      updateMutate({
        ...updatedFormData,
        status: "pending",
        pramote: "pending",
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const clearForm = () => {
    setFormData({});
    setSelectedtype("");
    setSelectedStatus("");
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name: string; value: string };

    setFormData((prevData: any) => ({
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

  const shouldHideSqrft = selectedtype === "Land";

  const shouldHideFields =
    (propertyTypesWithSubtypes.includes(selectedtype) &&
      selectedtype !== "Penthouse" &&
      selectedtype !== "Farmhouse") ||
    selectedtype === "Site";

  const propertiesStatushide = [
    "Site",
    "Land",
    "Commercial Space",
    "Industrial Property",
  ];

  const propertyStatusHide = propertiesStatushide.includes(selectedtype);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const uploadPromises = files.map((file) => {
        return cloudinary.mutateAsync(file);
      });

      Promise.all(uploadPromises)
        .then((responses) => {
          const imageUrls = responses.map((response) => response.secure_url);
          setNewImages((prev) => [...prev, ...imageUrls]);
          setFormData((prevData: any) => ({
            ...prevData,
            images: [...(prevData.images || []), ...imageUrls],
          }));
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "Error uploading images");
        });
    }
  };

  const handleDeleteExistingImage = (url: string) => {
    deletePropertyImage.mutate({productId: property._id, imageUrl : url}, {
      onSuccess: () => {
        const updatedImages = existingImages.filter(img => img !== url);
        setExistingImages(updatedImages);
        setFormData((prevData: any) => ({
          ...prevData,
          images: [...newImages, ...updatedImages],
        }));
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Error deleting image");
      },
    });
  };

  const handleDeleteNewImage = (index: number) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
    setFormData((prevData: any) => ({
      ...prevData,
      images: [...updatedImages, ...existingImages],
    }));
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

  const handleDistrictChange = (district: string) => {
    setDistrictSearchTerm(district);
    setFormData((prevData: any) => ({
      ...prevData,
      district,
    }));
  };

  const handleTalukChange = (taluk: string) => {
    setTalukSearchTerm(taluk);
    setFormData((prevData: any) => ({
      ...prevData,
      taluk,
    }));
  };

  // Determine if fields should be shown in update mode
  const showField = (fieldName: keyof Product) => {
    return mode === "update" && formData[fieldName] !== undefined;
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
        {mode === "post" ? "Post Property" : "Update Property"}
        <IconButton
          onClick={() => {
            onClose();
            if (mode === "post") clearForm();
          }}
          sx={{ color: "text.secondary" }}
        >
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
            <Box
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
                <TextField
                  name="state"
                  label="State"
                  value={formData.state || "Karnataka"}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      "&:hover": {
                        borderColor: "#04112f",
                      },
                    },
                  }}
                />
              </FormControl>
              <DistrictTalukSelector
                onDistrictChange={handleDistrictChange}
                onTalukChange={handleTalukChange}
                districtValue={districtSearchTerm}
                talukValue={talukSearchTerm}
              />
              {(showField("bathrooms") ||
                (selectedtype && !shouldHideFields)) && (
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
              {(showField("bhk") || (selectedtype && !shouldHideFields)) && (
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
              {(showField("propertyStatus") ||
                (selectedtype && !propertyStatusHide)) && (
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
                )}
              {(showField("possession") ||
                selectedStatus === "Under Construction") && (
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
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "15px",
              }}
            >
              {(showField("parking") ||
                (selectedtype && !shouldHideFields)) && (
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
              {(showField("furnishing") ||
                (selectedtype && !shouldHideFields)) && (
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
              {(showField("sqft") || !shouldHideSqrft) && (
                <TextField
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  onBlur={() => {
                    if (formData.price && formData.sqft) {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        pricePerSqft: (
                          Number(formData.price) / Number(formData.sqft)
                        ).toFixed(2),
                      }));
                    } else if (formData.sqft && formData.pricePerSqft) {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        price: (
                          Number(formData.sqft) * Number(formData.pricePerSqft)
                        ).toFixed(2),
                      }));
                    }
                  }}
                  fullWidth
                  label="Super Area (sqft)"
                  type="number"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: !!formData.sqft }}
                />
              )}
              {(showField("pricePerSqft") || !shouldHideSqrft) && (
                <TextField
                  name="pricePerSqft"
                  value={formData.pricePerSqft}
                  onChange={handleInputChange}
                  onBlur={() => {
                    if (formData.sqft && formData.pricePerSqft) {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        price: (
                          Number(formData.sqft) * Number(formData.pricePerSqft)
                        ).toFixed(2),
                      }));
                    } else if (formData.price && formData.pricePerSqft) {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        sqft: (
                          Number(formData.price) / Number(formData.pricePerSqft)
                        ).toFixed(2),
                      }));
                    }
                  }}
                  fullWidth
                  label="Price per sqft"
                  type="number"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: !!formData.pricePerSqft }}
                />
              )}
              {(showField("acres") || (selectedtype && shouldHideSqrft)) && (
                <TextField
                  name="acres"
                  value={formData.acres}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                  label="Acres"
                  variant="outlined"
                />
              )}
              <TextField
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={() => {
                  if (formData.sqft && formData.price) {
                    setFormData((prevData: any) => ({
                      ...prevData,
                      pricePerSqft: (
                        Number(formData.price) / Number(formData.sqft)
                      ).toFixed(2),
                    }));
                  } else if (formData.price && formData.pricePerSqft) {
                    setFormData((prevData: any) => ({
                      ...prevData,
                      sqft: (
                        Number(formData.price) / Number(formData.pricePerSqft)
                      ).toFixed(2),
                    }));
                  }
                }}
                fullWidth
                label="Price"
                type="number"
                required
                variant="outlined"
                InputLabelProps={{ shrink: !!formData.price }}
              />
              <FormControl>
                <FormLabel
                  sx={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "15px" }}
                >
                  {mode === "post" ? "Add Location" : "Update Location"}
                </FormLabel>
                <Button
                  variant="outlined"
                  onClick={() => setLoactionDialog(true)}
                >
                  {mode === "update" ? "Update Location" : "Add Location"}
                </Button>
              </FormControl>
              {selectedLocation && (
                <Box >
                  <FormLabel
                    sx={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "15px" }}
                  >
                    Selected Location
                  </FormLabel>

                  <Box sx={{
                    height: "150px",
                    width: "100%",
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.12)'
                  }}>
                    <MapContainer
                      center={selectedLocation}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                      dragging={false}
                      touchZoom={false}
                      doubleClickZoom={false}
                      scrollWheelZoom={false}
                      zoomControl={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={selectedLocation} />
                    </MapContainer>
                  </Box>
                </Box>
              )}
              <LocationDialog
                open={loactionDialog}
                onClose={handleCloseLocation}
                onLocationSelect={handleLocationSelect}
                initialLocation={property?.location}
              />
              <FormControl>
                <FormLabel sx={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "15px" }}>
                  Add Images
                </FormLabel>
                <Button variant="outlined" component="label">
                  Choose File
                  <input
                    type="file"
                    name="image"
                    hidden
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
                {(newImages.length > 0 || existingImages.length > 0) && (
                  <>
                    {newImages.length > 0 && (
                      <ImagesList
                        images={newImages}
                        handleRemoveImage={handleDeleteNewImage}
                        title="New Images"
                        deleteByIndex={true}
                      />
                    )}
                    {existingImages.length > 0 && (
                      <ImagesList
                        images={existingImages}
                        handleDeleteImage={handleDeleteExistingImage}
                        title="Existing Images"
                      />
                    )}
                  </>
                )}
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                  {mode === "post" ? "Post" : "Update"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {(isCreatePending || isUpdatePending || cloudinary.isPending || deletePropertyImage.isPending) && (
        <LoadingComponent />
      )}
    </Dialog>
  );
};

export default PropertyForm;
