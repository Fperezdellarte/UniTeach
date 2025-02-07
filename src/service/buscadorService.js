import axios from "axios";
import { API_URL } from "../config/constans";

export const buscadorService = {
  fetchMentors: async (searchTerm, searchFacultad, University) => {
    try {
      const response = await axios.get(`${API_URL}/search/mentors`, {
        params: {
          subjectName: searchTerm,
          Facultad: searchFacultad,
          University,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener los mentores"
      );
    }
  },
};
