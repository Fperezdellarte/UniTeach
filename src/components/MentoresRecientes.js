import React, { useContext } from 'react';
import MentorCard from '../components/mentorCard';
import { ClassesContext } from '../contexts/classesContext';

export const Mentores = () => {
  const { classesData } = useContext(ClassesContext);

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
      <h2 className='MentoresRecientes'>Mentores recientes</h2>
      <div className="row">
        {mentoresRecientes.map((mentor) => (
          <div className="col-md-4" key={mentor.idUser}>
            <MentorCard mentor={mentor} />
          </div>
        ))}
      </div>
    </div>
  );
};

