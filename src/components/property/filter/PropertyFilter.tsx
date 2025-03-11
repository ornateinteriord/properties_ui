import {
  Box,
  Button,
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
  selectedSortOrder: string;
  handleTypeChange: (event: SelectChangeEvent<string>) => void;
  handleSubtypeChange: (event: SelectChangeEvent<string>) => void;
  handleBudgetChange: (event: SelectChangeEvent<string>) => void;
  handleSquareFeetChange: (event: SelectChangeEvent<string>) => void;
  handleSortOrderChange: (event: SelectChangeEvent<string>) => void;
  handleClearFilters: () => void;
}

interface PropertyType {
  type: string;
  subTypes: string[];
}

const BUDGET_OPTIONS = [
  "₹5k - ₹1 Lac",
  "₹1 Lac - ₹10 Lac",
  "₹10 Lac - ₹25 Lac",
  "₹25 Lac - ₹50 Lac",
  "₹50 Lac - ₹75 Lac",
  "₹75 Lac - ₹1 Cr",
  "₹1 Cr - ₹2 Cr",
  "₹2 Cr+",
];

const SQUARE_FEET_OPTIONS = [
  { label: "< 1000 sqft", value: "0-1000" },
  { label: "1000-3000 sqft", value: "1000-3000" },
  { label: "3000-4000 sqft", value: "3000-4000" },
  { label: "> 4000 sqft", value: "4000+" },
];

export const PropertyFilter = ({
  selectedType,
  selectedSubtype,
  selectedBudget,
  selectedSquareFeet,
  selectedSortOrder,
  handleTypeChange,
  handleSubtypeChange,
  handleBudgetChange,
  handleSquareFeetChange,
  handleSortOrderChange,
  handleClearFilters
}: PropertyFilterProps) => {
  const { data: propertyTypes = [] } = useGetPropertyTypes(); // Ensuring it handles undefined case

  const filteredSubtypes =
    propertyTypes.find((property: PropertyType) => property.type === selectedType)?.subTypes || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Property Type & Subtype */}
      <FilterSection title="Property Type">
        <Dropdown
          label="Type"
          value={selectedType}
          onChange={handleTypeChange}
          options={[{ label: "All", value: "all" }, ...propertyTypes.map(({ type } : any) => ({ label: type, value: type }))]}
        />
        {filteredSubtypes.length > 0 && (
          <Dropdown
          label="Subtype"
          value={selectedSubtype}
          onChange={handleSubtypeChange}
          options={[{ label: "All", value: "all" }, ...filteredSubtypes.map((sub : any) => ({ label: sub, value: sub }))]}
        />
        )}
      </FilterSection>

      {/* Budget */}
      <FilterSection title="Budget">
        <Dropdown
          label="Price"
          value={selectedBudget}
          onChange={handleBudgetChange}
          options={[{ label: "All", value: "all" }, ...BUDGET_OPTIONS.map((b) => ({ label: b, value: b }))]}
        />
      </FilterSection>

      {/* Square Feet */}
      <FilterSection title="Area">
        <Dropdown
          label="Square Feet"
          value={selectedSquareFeet}
          onChange={handleSquareFeetChange}
          options={[{ label: "All", value: "all" }, ...SQUARE_FEET_OPTIONS]}
        />
      </FilterSection>

      <FilterSection title="Sort By">
      <Dropdown
        label="Price Order"
        value={selectedSortOrder}
        onChange={handleSortOrderChange}
        options={[
          { label: "Default", value: "default" },
          { label: "Low to High", value: "lowToHigh" },
          { label: "High to Low", value: "highToLow" },
        ]}
      />
    </FilterSection>
      <Button
        onClick={handleClearFilters}
        variant="outlined"
        fullWidth
        sx={{ mt: 2, textTransform: "none",borderColor:"#150b83c1",color:"#150b83c1" }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

/** Helper Component: Reusable Filter Section with Title */
const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

/** Helper Component: Reusable Dropdown Select */
const Dropdown = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { label: string; value: string }[];
}) => (
  <FormControl fullWidth size="small" sx={{ mb: 2, mt: 1 }}>
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange}>
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
