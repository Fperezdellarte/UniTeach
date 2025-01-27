import React, { useContext } from "react";
import { MentorCard } from "../../../../components/card/MentorCard";
import { ClassesContext } from "../../../../contexts/classesContext";
import "./mentoresRecientes.css";
import { Carousel } from "react-bootstrap";

export const Mentores = () => {
  const { classesData, loading } = useContext(ClassesContext);

  const mentoresRecientes = classesData?.recent.slice(0, 3).map((clase) => ({
    idUser: clase.mentorInfo?.idUser,
    MentorName: clase.mentorInfo?.Name,
    Opinion: clase.mentorInfo?.Opinion || 0,
    SubjectName: clase.Materia,
    MentorUniversity: clase.mentorInfo?.University,
    Avatar_URL: clase.mentorInfo?.Avatar_URL,
  }));

  return (
    <div>
      <h2 className="mentores-recientes-title">Mentores recientes</h2>
      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <>
          <Carousel className="carousel-container-mentores">
            {mentoresRecientes.map((mentor) => (
              <Carousel.Item key={mentor.idUser}>
                <div className="mentor-card-wrapper">
                  <MentorCard mentor={mentor} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="grid-container-mentores">
            {mentoresRecientes.map((mentor) => (
              <div key={mentor.idUser} className="mentor-card-wrapper">
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
