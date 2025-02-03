import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MentorCardsList } from "./mentorCardList/MentorCardList";
import "./Results.css";
import { DrawerFormFilter } from "./filterForm/DrawerFormFilter";

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [otherResults, setOtherResults] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      setFilteredResults(location.state.results);
      setOtherResults(location.state.otherResults);
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
        <DrawerFormFilter results={results} onFiltered={setFilteredResults} />
      </div>
      <div className="container-card">
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
      <div className="result-title-other-mentors">
        <h3>Mentores de otras Universidades:</h3>
        <div className="result-card-filter">
          {otherResults?.length > 0 ? (
            <MentorCardsList
              mentors={otherResults}
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
