import axios from 'axios';
import { API_URL } from './constans';
import { Navigate } from 'react-router-dom';

export const handleLogout = async () => {
  const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
  if (!confirmLogout) return;

  try {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (!authData || !authData.token) {
      throw new Error('Token no encontrado');
    }

    const token = authData.token;

    await axios.post(`${API_URL}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem('authData');
    window.location.reload();
    <Navigate to ='/login'/>
    console.log('Usuario ha cerrado sesión');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
