// hooks/useFilter.js
import { useState, useCallback } from "react";

const useFilter = (initialResults, initialOtherResults) => {
  const [filters, setFilters] = useState({
    sortBy: "distance",
    timeRange: [],
    days: [],
  });
  const [filteredResults, setFilteredResults] = useState(initialResults || []);
  const [filteredOtherResults, setFilteredOtherResults] = useState(
    initialOtherResults || []
  );

  const parseClassDetails = useCallback((details) => {
    if (!details) {
      return [];
    }
    if (typeof details !== "string") {
      console.warn("ClassDetails debe ser una cadena");
      return [];
    }

    try {
      const parsed = details
        .split(";")
        .map((session) => session.trim())
        .filter((session) => session.length > 0)
        .map((session) => {
          const parts = session.split(",").map((part) => part.trim());
          let timePart = null;
          let datePart = null;

          for (const part of parts) {
            if (part.match(/\d+:\d+/)) {
              timePart = part;
              break;
            }
          }

          for (const part of parts) {
            if (part.match(/\d+-\d+-\d+/)) {
              datePart = part;
              break;
            }
          }

          if (!timePart || !datePart) {
            console.warn("Formato de sesión inválido:", session);
            return null;
          }

          const [startTime] = timePart.split(" - ");
          const [day, month, year] = datePart.split("-");

          if (!day || !month || !year) {
            console.warn("Formato de fecha inválido:", datePart);
            return null;
          }

          return {
            time: startTime.trim(),
            date: new Date(`${year}-${month}-${day}`),
          };
        })
        .filter((item) => item !== null);
      return parsed;
    } catch (error) {
      console.error("Error al parsear ClassDetails:", details, error);
      return [];
    }
  }, []);

  // useCallback para applyFilters
  const applyFilters = useCallback(
    (results, filters) => {
      if (!results) {
        return [];
      }

      const filteredResults = results.filter((mentor) => {
        const sessions = parseClassDetails(mentor.ClassDetails);

        if (filters.timeRange.length > 0) {
          const hasMatchingTime = sessions.some(({ time }) => {
            const [hours] = time.split(":").map(Number);
            const timeOfDay = hours < 12 ? "morning" : "afternoon";
            return filters.timeRange.includes(timeOfDay);
          });
          if (!hasMatchingTime) {
            return false;
          }
        }

        if (filters.days.length > 0) {
          const hasMatchingDay = sessions.some(({ date }) => {
            const dayName = date
              .toLocaleDateString("es-ES", { weekday: "long" })
              .toLowerCase();
            return filters.days.includes(dayName);
          });
          if (!hasMatchingDay) {
            return false;
          }
        }
        return true;
      });

      const sortedResults = [...filteredResults].sort((a, b) => {
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

      return sortedResults;
    },
    [parseClassDetails]
  );

  const handleFilterChange = useCallback((e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (e.target.type === "checkbox") {
        updatedFilters[name] = checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value);
      } else {
        updatedFilters[name] = value;
      }
      return updatedFilters;
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    const newFilteredResults = applyFilters(initialResults, filters);
    const newFilteredOtherResults = applyFilters(
      initialOtherResults || [],
      filters
    );
    setFilteredResults(newFilteredResults);
    setFilteredOtherResults(newFilteredOtherResults);
  }, [initialResults, initialOtherResults, filters, applyFilters]);

  return {
    filters,
    handleFilterChange,
    handleApplyFilters,
    filteredResults,
    filteredOtherResults,
  };
};

export default useFilter;
