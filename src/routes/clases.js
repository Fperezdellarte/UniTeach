import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/clases.css'; // Ajusta la ruta según tu estructura de archivos
import { API_URL } from '../auth/constans';

  
const Clases = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Obtiene las clases desde la base de datos a través de la API
    const fetchClasesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/clases`); // Asegúrate de que la URL sea correcta
        setClases(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clases data:", error);
        setLoading(false); // Termina el estado de carga aunque haya error
      }
    };

    fetchClasesData();
  }, []);

  if (loading) {
    return <p>Cargando clases...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  if (!clases.length) {
    return <p>No hay clases disponibles.</p>;
  }
  const cancelarClase = async (id) => {
    try {
      await axios.delete(`${API_URL}/clases/${id}`); // Ajusta la URL según tu API
      // Actualiza el estado eliminando la clase cancelada
      setClases(clases.filter(clase => clase.id !== id));
    } catch (error) {
      console.error("Error cancelando la clase:", error);
    }
  };
  
  return (
    <div>
      <h1>Listado de Clases</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre del Mentor</th>
            <th>Materia</th>
            <th>Fecha y Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id}>
              <td>{clase.mentorName}</td>
              <td>{clase.subjectName}</td>
              <td>{new Date(clase.date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger" onClick={() => cancelarClase(clase.id)}>
                  Cancelar Clase
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clases;
