import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../auth/constans';

export const useBuscador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (searchFacultad) => {
    setLoading(true);
    setError(null);

    try {
      const authData = JSON.parse(sessionStorage.getItem('authData'));
      const University = authData?.user?.University;

      if (!University) {
        setError('No se pudo obtener la universidad del usuario.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/search/mentors`, {
        params: { 
          subjectName: searchTerm,
          Facultad:searchFacultad || '',
          University,
        },
      });

      const mentors = response.data;
      console.log(mentors)
      sessionStorage.setItem('searchTerm', searchTerm);

      navigate('/Results', { state: { results: mentors, } });
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
