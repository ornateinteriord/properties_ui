import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useGetPropertyTypes } from "../../../api/Property-Types";


interface PropertyFilterProps {
  selectedType: string;
  selectedSubtype: string;
  selectedBudget: string;
  selectedSquareFeet: string;
  handleTypeChange: (event: SelectChangeEvent<string>) => void;
  handleSubtypeChange: (event: SelectChangeEvent<string>) => void;
  handleBudgetChange: (event: SelectChangeEvent<string>) => void;
  handleSquareFeetChange: (event: SelectChangeEvent<string>) => void;
}

export const PropertyFilter = ({
  selectedType,
  selectedSubtype,
  selectedBudget,
  selectedSquareFeet,
  handleTypeChange,
  handleSubtypeChange,
  handleBudgetChange,
  handleSquareFeetChange,
}: PropertyFilterProps) => {

  const { data: properties } = useGetPropertyTypes();
  console.log(properties);



  const filteredSubtypes =
    properties?.find((property: any) => property.type === selectedType)
      ?.subTypes || [];

  const budget = [
    { label: "₹5k - ₹1 Lac" },
    { label: "₹1 Lac - ₹10 Lac" },
    { label: "₹10 Lac - ₹25 Lac" },
    { label: "₹25 Lac - ₹50 Lac" },
    { label: "₹50 Lac - ₹75 Lac" },
    { label: "₹75 Lac - ₹1 Cr" },
  ];

  const squareFeetOptions = [
    { label: "< 1000 sqft", value: "0-1000" },
    { label: "1000-3000 sqft", value: "1000-3000" },
    { label: "3000-4000 sqft", value: "3000-4000" },
    { label: "> 4000 sqft", value: "4000" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Property Type
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
          <InputLabel>Type</InputLabel>
          <Select value={selectedType} label="Type" onChange={handleTypeChange}>
            <MenuItem value="all">All</MenuItem>
            {properties?.map((property: any) => (
              <MenuItem key={property.type} value={property.type}>
                {property.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Subtype</InputLabel>
          <Select
            value={selectedSubtype}
            label="Subtype"
            onChange={handleSubtypeChange}
          >
            <MenuItem value="all">All</MenuItem>
            {filteredSubtypes.map((subtype: any) => (
              <MenuItem key={subtype} value={subtype}>
                {subtype}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Budget
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
          <InputLabel>Price</InputLabel>
          <Select
            value={selectedBudget}
            label="Price"
            onChange={handleBudgetChange}
          >
            <MenuItem value="all">All</MenuItem>
            {budget.map((item, index) => (
              <MenuItem key={index} value={`${item.label}`}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Range</InputLabel>
          <Select label="Price">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low_to_high">Low to High</MenuItem>
            <MenuItem value="high_to_low">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Area
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
          <InputLabel>Square Feet</InputLabel>
          <Select
            value={selectedSquareFeet}
            label="Square Feet"
            onChange={handleSquareFeetChange}
          >
            <MenuItem value="all">All</MenuItem>
            {squareFeetOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
