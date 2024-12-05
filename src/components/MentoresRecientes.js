import React, { useContext } from 'react';
import MentorCard from '../components/mentorCard';
import { ClassesContext } from '../contexts/classesContext';
import { useAuth } from '../auth/authProvider'; // Importar el hook useAuth
import { useNavigate } from 'react-router-dom';
import '../styles/homeLogueado.css';

export const Mentores = () => {
  const { classesData, loading } = useContext(ClassesContext);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  console.log("Datos recibidos del contexto en mentores recientes", classesData);

  const mentoresRecientes = classesData?.recent.map((clase) => ({
    idUser: clase.mentorInfo?.idUser,
    MentorName: clase.mentorInfo?.Name,
    Opinion: clase.mentorInfo?.Opinion || 0,
    SubjectName: clase.Materia,
    MentorUniversity: clase.mentorInfo?.University,
    Avatar_URL: clase.mentorInfo?.Avatar_URL,
  }));

  return (
    <div>
      <h2 className='mentores-recientes-title'>Mentores recientes</h2>
      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ): isAuthenticated ? (
      <div className="row">
        {mentoresRecientes.map((mentor) => (
          <div className="col-lg-2 col-md-6 mb-4 mentores-recientes" key={mentor.idUser}>
            <MentorCard mentor={mentor}/>
          </div>
        ))}
      </div>): (<div>Por favor, inicia sesión para ver tus Mentores Recientes.</div>)}
    </div>
  );
};

