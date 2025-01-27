import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterForm } from "./filterForm/FormFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { MentorCardsList } from "./mentorCardList/MentorCardList";
import "./Results.css";
import { Button } from "@mui/material";

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      setFilteredResults(location.state.results);
    } else {
      navigate("/app/home");
    }
  }, [location, navigate]);

  const handleCardClick = (mentorId) => {
    navigate(`/perfilMentor/${mentorId}`);
  };

  return (
    <div className="container-results">
      <h2 className="result-title">Resultados de la búsqueda</h2>
      <div className="button-filter">
        <Button
          className="result-filter-button"
          variant="outlined"
          startIcon={<FilterAltIcon />}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
      </div>
      <div className="container-card">
        {showFilters && (
          <FilterForm results={results} onFiltered={setFilteredResults} />
        )}

        <div className="result-card-filter">
          {filteredResults.length > 0 ? (
            <MentorCardsList
              mentors={filteredResults}
              onCardClick={handleCardClick}
            />
          ) : (
            <p className="result-p-empty">No se encontraron mentores.</p>
          )}
        </div>
      </div>
    </div>
  );
};
