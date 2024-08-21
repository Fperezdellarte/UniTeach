// src/components/Buscador.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../auth/constans';

export const useBuscador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const university = authData?.user?.University;

      if (!university) {
        setError('No se pudo obtener la universidad del usuario.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/search/mentors`, {
        params: { 
          subjectName: searchTerm,
          university,
        },
      });

      // Suponiendo que response.data es un array de mentores directamente
      const mentors = response.data;

      // Redirigir a la página de resultados con los datos
      navigate('/Results', { state: { results: mentors } });
    } catch (error) {
      setError('Error al buscar mentores');
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
