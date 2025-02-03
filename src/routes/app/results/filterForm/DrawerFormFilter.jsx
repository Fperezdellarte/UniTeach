import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { FilterForm } from "./FormFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export const DrawerFormFilter = ({ results, onFiltered }) => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleDrawer = (open) => () => {
    setShowFilters(open);
  };

  return (
    <div>
      <Button
        className="result-filter-button"
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
            results={results}
            onFiltered={onFiltered}
            setShowFilters={setShowFilters}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={toggleDrawer(false)}
          >
            Aplicar
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};
