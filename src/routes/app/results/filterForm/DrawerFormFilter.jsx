import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FilterForm } from "./FormFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useFilter from "../../../../hooks/useFilter";

export const DrawerFormFilter = ({
  results,
  otherResults,
  onFiltered,
  onFilteredOtherResults,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const {
    filters,
    handleFilterChange,
    handleApplyFilters,
    filteredResults,
    filteredOtherResults,
  } = useFilter(results, otherResults);

  const toggleDrawer = (open) => () => {
    setShowFilters(open);
  };

  useEffect(() => {
    if (showFilters) {
      handleApplyFilters();
    }
  }, [filters, showFilters, handleApplyFilters]);

  const onApply = () => {
    handleApplyFilters();
    onFiltered(filteredResults);
    onFilteredOtherResults(filteredOtherResults);
    toggleDrawer(false)();
  };

  return (
    <div>
      <Button
        className="result-filter-button"
        sx={{
          position: "fixed",
          top: "140px",
          zIndex: 100,
          right: "20px",
        }}
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={toggleDrawer(true)}
      >
        Filtros
      </Button>
      <Drawer anchor="left" open={showFilters} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: { xs: "80vw", sm: 300 },
            p: 2,
          }}
          role="presentation"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filtros
          </Typography>
          <FilterForm
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onApply}
          >
            Aplicar
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};
