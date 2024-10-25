import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PerfilMentor.css'; // Asegúrate de crear y ajustar esta hoja de estilos
import { API_URL } from '../auth/constans';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
        <p>Cargando datos del mentor...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-lg p-3">
        <div className="row g-0">
          {/* Sección de la Imagen */}
          <div className="col-md-4 text-center bg-light mentor-image-section">
            <img
              src={mentor.profileImageUrl || "https://via.placeholder.com/300x300"}
              alt={`${mentor.MentorName} profile`}
              className="img-fluid rounded-circle mentor-image my-4"
            />
            <h2 className="text-primary">{mentor.MentorName}</h2>
            <p className="text-muted">{mentor.SubjectName}</p>
          </div>

          {/* Sección de Información */}
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title text-primary">Perfil del Mentor</h3>
              <p className="card-text">
                <strong>Universidad:</strong> {mentor.MentorUniversity}
              </p>
              <p className="card-text">
                <strong>Materia:</strong> {mentor.SubjectName}
              </p>
              <p className="card-text">
                <strong>Calificación:</strong> {mentor.Opinion}/5
              </p>
              <hr />
              <h4 className="text-secondary">Biografía</h4>
              <p className="card-text">
                {mentor.bio || "Este mentor aún no ha agregado una biografía."}
              </p>
              <div className="social-links mt-4">
                <a href={mentor.linkedin || "#"} className="btn btn-outline-primary mx-1">
                  <i className="bi bi-linkedin"></i> LinkedIn
                </a>
                <a href={mentor.github || "#"} className="btn btn-outline-secondary mx-1">
                  <i className="bi bi-github"></i> GitHub
                </a>
                <a href={mentor.twitter || "#"} className="btn btn-outline-info mx-1">
                  <i className="bi bi-twitter"></i> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilMentor;
