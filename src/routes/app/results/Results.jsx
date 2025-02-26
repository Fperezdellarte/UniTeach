import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MentorCardsList } from "./mentorCardList/MentorCardList";
import "./Results.css";
import { DrawerFormFilter } from "./filterForm/DrawerFormFilter";
import { useTheme } from "../../../contexts/themeContext";
import { useBuscador } from "../../../contexts/searchContext";
import { CircularProgress, Typography } from "@mui/material";

export const Results = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { results, otherResults, loading, error } = useBuscador();
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredOtherResults, setFilteredOtherResults] = useState([]);

  useEffect(() => {
    if (!loading) {
      setFilteredResults(results || []);
      setFilteredOtherResults(otherResults || []);
    }
  }, [results, otherResults, loading]);

  const handleCardClick = (mentorId) => {
    navigate(`/perfilMentor/${mentorId}`);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <CircularProgress />
        <Typography
          variant="body1"
          style={{ marginTop: "10px", color: "#888" }}
        >
          Cargando...
        </Typography>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="container-results"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <h2 className="result-title">Resultados de la búsqueda</h2>
      <div className="button-filter">
        <DrawerFormFilter
          results={results}
          otherResults={otherResults}
          onFiltered={setFilteredResults}
          onFilteredOtherResults={setFilteredOtherResults}
        />
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
          {filteredOtherResults?.length > 0 ? (
            <MentorCardsList
              mentors={filteredOtherResults}
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
