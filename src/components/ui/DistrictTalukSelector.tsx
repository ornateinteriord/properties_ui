import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect, memo } from "react";
import { karnatakaData } from "../property/data/State";

interface DistrictTalukSelectorProps {
  onDistrictChange: (district: string) => void;
  onTalukChange: (taluk: string) => void;
  districtValue: string;
  talukValue: string;
}

const DistrictTalukSelector = ({
  onDistrictChange,
  onTalukChange,
  districtValue,
  talukValue,
}: DistrictTalukSelectorProps) => {
  const [talukSuggestions, setTalukSuggestions] = useState<string[]>([]);

  // Get all districts from karnatakaData
  const allDistricts = karnatakaData.map((d) => d.district);

  // Handle district selection
  const handleDistrictChange = (_event: any, value: string) => {
    onDistrictChange(value); // Notify parent of district change
    const selectedDistrict = karnatakaData.find(
      (d) => d.district.toLowerCase() === value.toLowerCase()
    );
    setTalukSuggestions(selectedDistrict?.taluks || []); // Update taluks based on district
  };

  // Handle taluk selection
  const handleTalukChange = (_event: any, value: string) => {
    onTalukChange(value); // Notify parent of taluk change
  };

  // Set initial taluk suggestions when districtValue changes
  useEffect(() => {
    if (districtValue) {
      const selectedDistrict = karnatakaData.find(
        (d) => d.district.toLowerCase() === districtValue.toLowerCase()
      );
      setTalukSuggestions(selectedDistrict?.taluks || []);
    }
  }, [districtValue]);

  return (
    <>
      <Autocomplete
        freeSolo
        options={allDistricts}
        value={districtValue}
        onInputChange={handleDistrictChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search District"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {talukSuggestions.length > 0 && (
        <Autocomplete
          freeSolo
          options={talukSuggestions}
          value={talukValue}
          onInputChange={handleTalukChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Taluk"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
          )}
        />
      )}
    </>
  );
};

export default memo(DistrictTalukSelector);