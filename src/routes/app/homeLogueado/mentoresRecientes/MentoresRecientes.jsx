import React, { useContext, useEffect, useState } from "react";
import { MentorCard } from "../../../../components/card/MentorCard";
import { ClassesContext } from "../../../../contexts/classesContext";
import "./mentoresRecientes.css";
import { Carousel } from "react-bootstrap";
import { mentorService } from "../../../../service/mentorService";
import { useAuth } from "../../../../contexts/authContext"; // Importar useAuth
import { Skeleton } from "@mui/material";

export const Mentores = () => {
  const { classesData, loading } = useContext(ClassesContext);
  const { token } = useAuth();
  const [mentores, setMentores] = useState([]);
  const [loadingMentores, setLoadingMentores] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentores = async () => {
      try {
        if (classesData?.recent?.length > 0) {
          const subjectMap = {};
          classesData.recent.forEach((clase) => {
            subjectMap[clase.mentorId] = clase.Materia;
          });
          const mentorIds = classesData.recent
            .slice(0, 4)
            .map((clase) => clase.mentorId);

          const mentoresData = await Promise.all(
            mentorIds.map((id) => mentorService.fetchMentor(id, token))
          );
          const adaptedMentores = mentoresData.map((mentor) => {
            if (!mentor) {
              console.error("fetchMentores: mentor es null o undefined");
              return {};
            }

            return {
              idUser: mentor.idUser,
              MentorName: mentor.Name,
              MentorUniversity: mentor.University,
              Avatar_URL: mentor.Avatar_URL,
              SubjectName: subjectMap[mentor.idUser] || "Materia Desconocida",
              Opinion: mentor.Opinion,
            };
          });

          setMentores(adaptedMentores);
        }
        setLoadingMentores(false);
      } catch (err) {
        console.error("Error en fetchMentores:", err);
        setError(err.message);
        setLoadingMentores(false);
      }
    };

    if (token && !loading) {
      fetchMentores();
    }
  }, [classesData, token, loading]);

  if (loading || loadingMentores) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          padding: "20px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={300}
          height={200}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={300}
          height={200}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={300}
          height={200}
          animation="wave"
        />
      </div>
    );
  }
  if (error) {
    return <div>No se pudo obtener los mentores</div>;
  }

  if (!classesData?.recent || classesData.recent.length === 0) {
    return null;
  }
  return (
    <div className="mentores-recientes-container-overflow">
      <h2 className="mentores-recientes-title">Mentores recientes</h2>
      <>
        <Carousel className="carousel-container-mentores">
          {mentores.map((mentor) => (
            <Carousel.Item key={mentor.idUser}>
              <div className="mentor-card-wrapper">
                <MentorCard mentor={mentor} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="grid-container-mentores">
          {mentores.map((mentor) => (
            <div key={mentor.idUser} className="mentor-card-wrapper">
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </>
    </div>
  );
};
