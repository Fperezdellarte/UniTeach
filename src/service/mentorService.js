import axios from "axios";
import { API_URL } from "../config/constans";

export const mentorService = {
  fetchMentor: async (idMentor, token) => {
    try {
      const response = await axios.get(`${API_URL}/users/mentor/${idMentor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener los mentores"
      );
    }
  },

  rateMentor: async (idMentor, rating, comment, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/rating`,
        { rate: { idMentor, rating, comment } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al calificar al mentor"
      );
    }
  },
};
