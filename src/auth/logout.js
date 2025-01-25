import axios from "axios";
import { API_URL } from "./constans";

export const handleLogout = async (navigate) => {
  try {
    const authData = JSON.parse(sessionStorage.getItem("authData"));
    if (!authData?.token) throw new Error("Token no encontrado");

    await axios.post(`${API_URL}/users/logout`, null, {
      headers: { Authorization: `Bearer ${authData.token}` },
    });

    sessionStorage.removeItem("authData");
    if (navigate) navigate("/auth/login");
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};
