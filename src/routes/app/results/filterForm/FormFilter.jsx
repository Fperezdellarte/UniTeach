import React from "react";
import PropTypes from "prop-types";

export const FilterForm = ({ results, onFiltered }) => {
  const [filters, setFilters] = React.useState({ sortBy: "distance" });

  const applyFilters = (results, sortBy) => {
    return [...results].sort((a, b) => {
      if (sortBy === "rating") {
        const ratingA = typeof a.rating === "number" ? a.rating : 0;
        const ratingB = typeof b.rating === "number" ? b.rating : 0;
        return ratingB - ratingA;
      }
      if (sortBy === "alfabeto") {
        const nameA = a.Name?.toLowerCase() || "";
        const nameB = b.Name?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      const filtered = applyFilters(results, newFilters.sortBy);
      onFiltered(filtered);
      return newFilters;
    });
  };

  return (
    <div className="col-md-3 container-filter">
      <div className="filters">
        <div className="mb-3">
          <label className="form-label">Ordenar:</label>
          <select
            className="form-select"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="distance">Por defecto</option>
            <option value="rating">Mejor puntuación</option>
            <option value="alfabeto">Alfabeticamente</option>
          </select>
        </div>
      </div>
    </div>
  );
};

FilterForm.propTypes = {
  results: PropTypes.array.isRequired,
  onFiltered: PropTypes.func.isRequired,
};
