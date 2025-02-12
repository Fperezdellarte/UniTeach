import { useState, useEffect } from "react";
import { careersService } from "../service/careersService";

export const useCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careersService.fetchCareers();
        
        // Asegúrate de acceder al array correcto
        setCareers(response.careers); // Adapta según la estructura real
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);
console.log(careers)
  return { careers, loading, error };
};
