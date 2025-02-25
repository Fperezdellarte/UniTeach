import axios from "axios";
import { API_URL } from "../config/constans";

export const usuarioService = {
  actualizarPerfil: async (userId, token, formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.Name);
    formDataToSend.append("Username", formData.Username);
    formDataToSend.append("Mail", formData.Mail);
    formDataToSend.append("Phone", formData.Phone);
    if (formData.Avatar_File) {
      formDataToSend.append("Avatar_URL", formData.Avatar_File);
    }

    try {
      const response = await axios.patch(
        `${API_URL}/users/${userId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar el perfil"
      );
    }
  },

  solicitarCambioPassword: async (token, email) => {
    try {
      await axios.post(
        `${API_URL}/users/sendEmail`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al enviar el correo"
      );
    }
  },
  inscriptionClass: async (idClass, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/inscription`,
        {
          idClass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al inscribirse a la clase"
      );
    }
  },
};

export const passwordService = {
  sendResetEmail: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/users/sendEmail`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al enviar el correo"
      );
    }
  },

  resetPassword: async ({ password, token }) => {
    try {
      const response = await axios.post(`${API_URL}/users/reset-password`, {
        password,
        token,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al restablecer contraseña"
      );
    }
  },
};
