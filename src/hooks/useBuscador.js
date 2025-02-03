import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constans";

export const useBuscador = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (searchFacultad = "") => {
    setLoading(true);
    setError(null);

    try {
      const authData = JSON.parse(sessionStorage.getItem("authData"));
      const University = authData?.user?.University;

      if (!University) {
        setError("No se pudo obtener la universidad del usuario.");
        return;
      }

      const response = await axios.get(`${API_URL}/search/mentors`, {
        params: {
          subjectName: searchTerm,
          Facultad: searchFacultad,
          University,
        },
      });
      const responseOtherUniversity = await axios.get(
        `${API_URL}/search/mentors`,
        {
          params: {
            subjectName: searchTerm,
            Facultad: searchFacultad,
            University: "UTN",
          },
        }
      );
      console.log(responseOtherUniversity);

      if (
        response.data.length === 0 &&
        responseOtherUniversity.data.length === 0
      ) {
        setError("No se encontraron resultados");
        return;
      }
      navigate("/app/results", {
        state: {
          results: response.data,
          otherResults: responseOtherUniversity.data,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Error al buscar mentores");
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    loading,
    error,
    handleSearch,
  };
};
