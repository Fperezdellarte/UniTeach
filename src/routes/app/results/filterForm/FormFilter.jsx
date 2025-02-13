import React from "react";
import {
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Box,
} from "@mui/material";

export const FilterForm = ({ filters, handleFilterChange }) => {
  return (
    <div className="col-md-3 container-filter">
      <FormGroup>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Ordenar:</FormLabel>
          <Select
            name="sortBy"
            value={filters.sortBy}
            sx={{ width: "250px" }}
            onChange={handleFilterChange}
          >
            <MenuItem value="distance">Por defecto</MenuItem>
            <MenuItem value="rating">Mejor puntuación</MenuItem>
            <MenuItem value="alfabeto">Alfabéticamente</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Horario:</FormLabel>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "250px" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="timeRange"
                  value="morning"
                  checked={filters.timeRange.includes("morning")}
                  onChange={handleFilterChange}
                />
              }
              label="Mañana (antes de 12:00)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="timeRange"
                  value="afternoon"
                  checked={filters.timeRange.includes("afternoon")}
                  onChange={handleFilterChange}
                />
              }
              label="Tarde (después de 12:00)"
            />
          </Box>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Días:</FormLabel>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(
              (day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      name="days"
                      value={day.toLowerCase()}
                      checked={filters.days.includes(day.toLowerCase())}
                      onChange={handleFilterChange}
                    />
                  }
                  label={day}
                />
              )
            )}
          </Box>
        </FormControl>
      </FormGroup>
    </div>
  );
};
