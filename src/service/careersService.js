import axios from "axios";
import { API_URL } from "../config/constans";

export const careersService = {
  fetchCareers: async () => {
    try {
      const response = await axios.get(`${API_URL}/careers`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener las carreras"
      );
    }
  },
};