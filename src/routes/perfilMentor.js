import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PerfilMentor.css'; // Ajusta la ruta según tu estructura de archivos
import { API_URL } from '../auth/constans';


const PerfilMentor = () => {
  const { id } = useParams(); // Obtiene el ID del mentor de la URL
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // Obtiene los datos del mentor desde una API
    const fetchMentorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`); // Asegúrate de que la URL sea correcta
        setMentor(response.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, [id]);

  if (!mentor) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div>
      <h1>Perfil del Mentor</h1>
      <img
        src={mentor.profileImageUrl || "https://via.placeholder.com/300x300"}
        alt={`${mentor.MentorName} profile`}
        className="mentor-image"
      />
      <h2>{mentor.MentorName}</h2>
      <p><strong>Materia:</strong> {mentor.SubjectName}</p>
      <p><strong>Universidad:</strong> {mentor.MentorUniversity}</p>
      <p><strong>Rating:</strong> {mentor.Opinion}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default PerfilMentor;
