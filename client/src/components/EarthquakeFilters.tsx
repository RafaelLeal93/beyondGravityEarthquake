import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface EarthquakeFiltersProps {
  filters: {
    minMagnitude: number;
    maxMagnitude: number;
    limit: number;
  };
  onFiltersChange: (filters: {
    minMagnitude: number;
    maxMagnitude: number;
    limit: number;
  }) => void;
}

const EarthquakeFilters: React.FC<EarthquakeFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleMagnitudeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onFiltersChange({
        ...filters,
        minMagnitude: newValue[0],
        maxMagnitude: newValue[1],
      });
    }
  };

  const handleLimitChange = (event: any) => {
    onFiltersChange({
      ...filters,
      limit: parseInt(event.target.value),
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      minMagnitude: 0,
      maxMagnitude: 10,
      limit: 100,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography gutterBottom>
            Magnitude Range: {filters.minMagnitude} - {filters.maxMagnitude}
          </Typography>
          <Slider
            value={[filters.minMagnitude, filters.maxMagnitude]}
            onChange={handleMagnitudeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
            marks={[
              { value: 0, label: "0" },
              { value: 2, label: "2" },
              { value: 4, label: "4" },
              { value: 6, label: "6" },
              { value: 8, label: "8" },
              { value: 10, label: "10" },
            ]}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Results Limit</InputLabel>
            <Select
              value={filters.limit}
              label="Results Limit"
              onChange={handleLimitChange}
            >
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={resetFilters}
            fullWidth
            size="small"
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarthquakeFilters;
