import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  Stack,
  Typography,
  InputAdornment,
  Popover,
  Paper,
  Chip,
  Slider,
} from "@mui/material";

import { MapPin, Search, IndianRupee } from "lucide-react";

interface PropertyType {
  type: string;
  subTypes: string[];
}

interface BudgetRange {
  label: string;
  min: number;
  max: number;
}

const propertyTypes: PropertyType[] = [
  {
    type: "Apartment",
    subTypes: ["1 BHK", "2 BHK", "3 BHK", "4 BHK+"],
  },
  {
    type: "Land",
    subTypes: ["Agricultural Land", "Commercial Land", "Residential Land"],
  },
  {
    type: "Site",
    subTypes: [
      "< 1200 sqft",
      "1200-2400 sqft",
      "2400-4800 sqft",
      "> 4800 sqft",
    ],
  },
];

const budgetRanges: BudgetRange[] = [
  { label: "₹5k - ₹1 Lac", min: 5000, max: 100000 },
  { label: "₹1 Lac - ₹10 Lac", min: 100000, max: 1000000 },
  { label: "₹10 Lac - ₹25 Lac", min: 1000000, max: 2500000 },
  { label: "₹25 Lac - ₹50 Lac", min: 2500000, max: 5000000 },
  { label: "₹50 Lac - ₹75 Lac", min: 5000000, max: 7500000 },
  { label: "₹75 Lac - ₹1 Cr", min: 7500000, max: 10000000 },
];

const PropertySearch = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [subType, setSubType] = useState("");
  const [selectedBudgetRange, setSelectedBudgetRange] =
    useState<BudgetRange | null>(null);
  const [budgetAnchorEl, setBudgetAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [customRange, setCustomRange] = useState<[number, number]>([
    5000, 10000000,
  ]);
  const selectedPropertyTypeObj = propertyTypes.find(
    (p) => p.type === propertyType
  );
  const handleBudgetClick = (event: React.MouseEvent<HTMLElement>) => {
    setBudgetAnchorEl(event.currentTarget);
  };

  const handleBudgetClose = () => {
    setBudgetAnchorEl(null);
  };

  const handleBudgetSelect = (range: BudgetRange) => {
    setSelectedBudgetRange(range);
    setCustomRange([range.min, range.max]);
    handleBudgetClose();
  };

  const formatBudget = (value: number) => {
    if (value >= 10000000) return `₹1 Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
    return `₹${value}`;
  };

  const handleSearch = () => {
    console.log({
      location,
      propertyType,
      subType,
      budget: selectedBudgetRange || {
        min: customRange[0],
        max: customRange[1],
      },
    });
  };
  const budgetOpen = Boolean(budgetAnchorEl);

  const Divider = () => (
    <Box
      sx={{
        height: 30,
        width: "2px",
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        mx: { sm: 1 },
        display: { xs: "none", sm: "block" },
      }}
    />
  );

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 0 }}
      alignItems="center"
      sx={{

        background: "white",
        borderRadius: "50px",
        overflow: "hidden",
        boxShadow: "0 4px 30px rgba(60, 54, 11, 0.3)",
        padding: { xs: "12px", sm: "8px" },
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 40px rgba(67, 60, 97, 0.4)",
        },
      }}
    >
      <FormControl
        sx={{
          flex: 2,
          minWidth: { xs: "100%", sm: "200px" },
          px: 2,
        }}
      >
        <TextField
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MapPin size={20} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: "48px",
            },
          }}
        />
      </FormControl>
      <Divider />
      <FormControl
        sx={{
          flex: 1.5,
          alignItems:{xs:"flex-start"},
          minWidth: { xs: "100%", sm: "150px" },
          px: 5,
        }}
      >
        <Select
          value={propertyType}
          displayEmpty
          variant="standard"
          disableUnderline
          onChange={(e) => {
            setPropertyType(e.target.value);
            setSubType("");
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span style={{ color: "rgba(0,0,0,0.5)" }}>Property Type</span>
              );
            }
            return selected;
          }}
        >
          {propertyTypes.map((type) => (
            <MenuItem key={type.type} value={type.type}>
              {type.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <FormControl
        sx={{
          flex: 1.5,
          alignItems:{xs:"flex-start"},
          minWidth: { xs: "100%", sm: "150px" },
          px: 5,
        }}
        disabled={!propertyType}
      >
        <Select
          value={subType}
          displayEmpty
          variant="standard"
          disableUnderline
          onChange={(e) => setSubType(e.target.value)}
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "rgba(0,0,0,0.5)" }}>Sub Type</span>;
            }
            return selected;
          }}
        >
          {selectedPropertyTypeObj?.subTypes.map((subType) => (
            <MenuItem key={subType} value={subType}>
              {subType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <Box
        sx={{
          flex: 1.5,
          minWidth: { xs: "100%", sm: "230px" },
          px: 2,
        }}
      >
        <Button
          onClick={handleBudgetClick}
          variant="text"
          sx={{
            width: "100%",
            height: "48px",
            color: "rgba(0,0,0,0.7)",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
          startIcon={<IndianRupee size={18} />}
        >
          {selectedBudgetRange ? (
            selectedBudgetRange.label
          ) : (
            <span style={{ color: "rgba(0,0,0,0.5)" }}>Select Budget</span>
          )}
        </Button>
        <Popover
          open={budgetOpen}
          anchorEl={budgetAnchorEl}
          onClose={handleBudgetClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Paper sx={{ p: 2, width: 320 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Select Budget Range
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
                {budgetRanges.map((range) => (
                  <Chip
                    key={range.label}
                    label={range.label}
                    onClick={() => handleBudgetSelect(range)}
                    sx={{
                      borderRadius: "16px",
                      backgroundColor:
                        selectedBudgetRange?.label === range.label
                          ? "#dc2626"
                          : "transparent",
                      color:
                        selectedBudgetRange?.label === range.label
                          ? "white"
                          : "inherit",
                      border: "1px solid",
                      borderColor:
                        selectedBudgetRange?.label === range.label
                          ? "#dc2626"
                          : "rgba(0,0,0,0.2)",
                      "&:hover": {
                        backgroundColor:
                          selectedBudgetRange?.label === range.label
                            ? "#b91c1c"
                            : "rgba(0,0,0,0.04)",
                      },
                    }}
                  />
                ))}
              </Stack>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Custom Range
                </Typography>
                <Box sx={{ px: 1, pt: 1 }}>
                  <Slider
                    value={customRange}
                    onChange={(_, newValue) =>
                      setCustomRange(newValue as [number, number])
                    }
                    min={5000}
                    max={10000000}
                    step={1000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatBudget}
                    sx={{
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "#dc2626",
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#dc2626",
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "#dc2626",
                      },
                    }}
                  />
                </Box>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="textSecondary">
                    {formatBudget(customRange[0])}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatBudget(customRange[1])}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Popover>
      </Box>
      <Box sx={{ px: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            height: "48px",
            minWidth: { xs: "100%", sm: "120px" },
            borderRadius: { xs: "24px", sm: "50px" },
            backgroundColor: "#150b83c1",
            "&:hover": {
              backgroundColor: "#4136bcc1",
            },
          }}
          startIcon={<Search />}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );
};

export default PropertySearch;
