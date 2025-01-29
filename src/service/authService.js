import { API_URL } from "../auth/constans";
import axios from "axios";

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/login`, credentials);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error de autenticación");
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/signup`, userData);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error en el registro";

    const errorObject = {};
    if (errorMessage.includes("DNI")) {
      errorObject.DNI = "Ya hay un usuario con ese DNI";
    }
    if (errorMessage.includes("Legajo")) {
      errorObject.Legajo = "Ya hay un usuario con ese legajo";
    }
    if (errorMessage.includes("Mail")) {
      errorObject.Mail = "Ya hay una cuenta con ese mail";
    }
    if (errorMessage.includes("Username")) {
      errorObject.Username = "Este usuario ya esta en uso";
    }
    throw { errors: errorObject, message: errorMessage };
  }
};
