import { API_URL } from "../config/constans";
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
    const errorObj = new Error(errorMessage);

    errorObj.errors = {};

    if (errorMessage.includes("DNI")) {
      errorObj.errors.DNI = "Ya hay un usuario con ese DNI";
    }
    if (errorMessage.includes("Legajo")) {
      errorObj.errors.Legajo = "Ya hay un usuario con ese legajo";
    }
    if (errorMessage.includes("Mail")) {
      errorObj.errors.Mail = "Ya hay una cuenta con ese mail";
    }
    if (errorMessage.includes("Username")) {
      errorObj.errors.Username = "Este usuario ya esta en uso";
    }

    throw errorObj;
  }
};

export const handleLogout = async (token) => {
  try {
    await axios.post(`${API_URL}/users/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};
