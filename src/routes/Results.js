import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MentorCard from '../components/mentorCard';
import { Navbar } from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};
  const [filteredResults, setFilteredResults] = useState(results || []);
  const [filters, setFilters] = useState({
    sortBy: 'distance',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (Array.isArray(results)) {
      const sortedResults = [...results].sort((a, b) => {
        if (filters.sortBy === 'rating') {
          const ratingA = typeof a.rating === 'number' ? a.rating : 0;
          const ratingB = typeof b.rating === 'number' ? b.rating : 0;
          return ratingB - ratingA; // Descendente
        } else if (filters.sortBy === 'alfabeto') {
          const nameA = a.Name?.toLowerCase() || '';
          const nameB = b.Name?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        }
        return 0; // Por defecto
      });

      console.log('Orden aplicado:', filters.sortBy, sortedResults);
      setFilteredResults(sortedResults); // Actualiza estado
    }
  }, [filters, results]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') {
      setFilters({ sortBy: value });
    }
  };

  const handleCardClick = (mentorId) => {
    navigate(`/perfilMentor/${mentorId}`);
  };

  return (
    <div className="container-results">
      <Navbar />
      <h2 className="text-center result-title">Resultados de la búsqueda</h2>
      <div className="row">
        <div className="col-12 mb-3">
          <button
            className="blue-button filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>
        {showFilters && (
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
        )}
        <div className={`col-md-${showFilters ? '9' : '12'}`} key={filters.sortBy}>
          {filteredResults && filteredResults.length > 0 ? (
            <div className="row container-mentor-results">
              {filteredResults.map((mentor) => (
                <div className="col-lg-3 col-md-6 mb-4" key={mentor.idUser}>
                  <MentorCard
                    mentor={mentor}
                    onClick={() => handleCardClick(mentor.idUser)}
                  />
                </div>
              ))}
            </div>
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

export default Results;
