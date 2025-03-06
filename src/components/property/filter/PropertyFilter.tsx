import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

interface FiltersProps {
  bhk: string;
  price: string;
  sqft: string;
  onBhkChange: (event: SelectChangeEvent) => void;
  onPriceChange: (event: SelectChangeEvent) => void;
  onSqftChange: (event: SelectChangeEvent) => void;
}

export const PropertyFilter = ({ bhk, price, sqft, onBhkChange, onPriceChange, onSqftChange }: FiltersProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Property Type
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>BHK</InputLabel>
          <Select value={bhk} label="BHK" onChange={onBhkChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="1">1 BHK</MenuItem>
            <MenuItem value="2">2 BHK</MenuItem>
            <MenuItem value="3">3 BHK</MenuItem>
            <MenuItem value="4">4+ BHK</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Budget
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Price</InputLabel>
          <Select value={price} label="Price" onChange={onPriceChange}>
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
        <FormControl fullWidth size="small">
          <InputLabel>Square Feet</InputLabel>
          <Select value={sqft} label="Square Feet" onChange={onSqftChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="0-1000">Under 1000 sqft</MenuItem>
            <MenuItem value="1000-2000">1000-2000 sqft</MenuItem>
            <MenuItem value="2000+">Above 2000 sqft</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};