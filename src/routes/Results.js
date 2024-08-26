import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MentorCard from '../components/mentorCard';
import { Navbar } from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Results.css';


const Results = () => {

  const location = useLocation();
  const { results } = location.state || {};
  const [filteredResults, setFilteredResults] = useState(results || []);
  const [filters, setFilters] = useState({
    shift: [], // Para los turnos
    days: [], // Para los días de la semana
    sortBy: 'distance' // Para ordenar por "clase más cerca" o "mejor puntuación"
  });

  useEffect(() => {
    if (results) {
      const filtered = results.filter(mentor => {
        // Filtrar por turnos
        const shiftMatch = filters.shift.length === 0 || filters.shift.includes(mentor.shift);
        // Filtrar por días de la semana
        const daysMatch = filters.days.length === 0 || filters.days.includes(mentor.day);
        return shiftMatch && daysMatch;
      });

      // Ordenar los resultados
      const sortedResults = filtered.sort((a, b) => {
        if (filters.sortBy === 'distance') {
          return a.distance - b.distance; // Asumiendo que 'distance' es una propiedad de los resultados
        } else if (filters.sortBy === 'rating') {
          return b.rating - a.rating; // Asumiendo que 'rating' es una propiedad de los resultados
        }
        return 0;
      });

      setFilteredResults(sortedResults);
    }
  }, [filters, results]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'shift') {
      setFilters(prevFilters => {
        const updatedShifts = checked
          ? [...prevFilters.shift, value]
          : prevFilters.shift.filter(shift => shift !== value);
        return { ...prevFilters, shift: updatedShifts };
      });
    } else if (name === 'day') {
      setFilters(prevFilters => {
        const updatedDays = checked
          ? [...prevFilters.days, value]
          : prevFilters.days.filter(day => day !== value);
        return { ...prevFilters, days: updatedDays };
      });
    } else if (name === 'sortBy') {
      setFilters(prevFilters => ({ ...prevFilters, sortBy: value }));
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-center mb-4">Resultados de la búsqueda</h2>
      <div className="row">
        {/* Columna de filtros */}
        <div className="col-md-3">
          <div className="filters">
            <h5>Filtrar por:</h5>

            <div className="mb-3">
              <h6>Turno:</h6>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="morning"
                  name="shift"
                  value="morning"
                  onChange={handleFilterChange}
                />
                <label htmlFor="morning" className="form-check-label">Mañana</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="afternoon"
                  name="shift"
                  value="afternoon"
                  onChange={handleFilterChange}
                />
                <label htmlFor="afternoon" className="form-check-label">Tarde</label>
              </div>
            </div>

            <div className="mb-3">
              <h6>Día:</h6>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div className="form-check" key={day}>
                  <input
                    type="checkbox"
                    id={day}
                    name="day"
                    value={day}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor={day} className="form-check-label">{day}</label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">Ordenar por:</label>
              <select
                className="form-select"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
              >
                <option value="distance">Clase más cerca</option>
                <option value="rating">Mejor puntuación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Columna de resultados */}
        <div className="col-md-9">
          {filteredResults && filteredResults.length > 0 ? (
            <div className="row">
              {filteredResults.map((mentor) => (
                <div className="col-lg-4 col-md-6 mb-4" key={mentor.idUser}>
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No se encontraron mentores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;

