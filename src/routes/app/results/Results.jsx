import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterForm } from "./filterForm/FormFilter";
import { MentorCardsList } from "./mentorCardList/MentorCardList";
import "./Results.css";

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Carga inicial de resultados
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
      <h2 className="text-center result-title">Resultados de la búsqueda</h2>
      <div className="row">
        <div className="col-12 mb-3">
          <button
            className="blue-button filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        {showFilters && (
          <FilterForm results={results} onFiltered={setFilteredResults} />
        )}

        <div className={`col-md-${showFilters ? "9" : "12"}`}>
          {filteredResults.length > 0 ? (
            <MentorCardsList
              mentors={filteredResults}
              onCardClick={handleCardClick}
            />
          ) : (
            <p className="text-center text-muted no-result-text">
              No se encontraron mentores.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
