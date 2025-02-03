import React, { useState } from "react";
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

export const FilterForm = ({ results, onFiltered }) => {
  const [filters, setFilters] = useState({
    sortBy: "distance",
    timeRange: [],
    days: [],
  });

  const parseClassDetails = (details) => {
    if (!details || typeof details !== "string") return [];

    return details
      .split(";")
      .map((session) => session.trim())
      .filter((session) => session.includes(","))
      .map((session) => {
        const [timePart, datePart] = session.split(", ");
        if (!timePart || !datePart) return null;

        const [startTime] = timePart.split(" - ");
        const [day, month, year] = datePart.split("-");

        if (!day || !month || !year) return null;

        return {
          time: startTime.trim(),
          date: new Date(`${year}-${month}-${day}`),
        };
      })
      .filter((item) => item !== null);
  };

  const applyFilters = (results) => {
    return results
      .filter((mentor) => {
        const sessions = parseClassDetails(mentor.ClassDetails);

        if (filters.timeRange.length > 0) {
          const timeMatch = sessions.some(({ time }) => {
            const [hours] = time.split(":").map(Number);
            return filters.timeRange.includes(
              hours < 12 ? "morning" : "afternoon"
            );
          });
          if (!timeMatch) return false;
        }

        if (filters.days.length > 0) {
          const dayMatch = sessions.some(({ date }) => {
            const dayName = date.toLocaleDateString("es-ES", {
              weekday: "long",
            });
            return filters.days.includes(dayName.toLowerCase());
          });
          if (!dayMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "rating") {
          const ratingA = typeof a.Opinion === "number" ? a.Opinion : 0;
          const ratingB = typeof b.Opinion === "number" ? b.Opinion : 0;
          return ratingB - ratingA;
        }
        if (filters.sortBy === "alfabeto") {
          const nameA = a.MentorName?.toLowerCase() || "";
          const nameB = b.MentorName?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        }
        return 0;
      });
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (e.target.type === "checkbox") {
        newFilters[name] = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
      } else {
        newFilters[name] = value;
      }
      const filtered = applyFilters(results);
      onFiltered(filtered);
      return newFilters;
    });
  };
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

        {/* Filtro de Horario */}
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
