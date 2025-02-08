import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Avatar } from "@mui/material";
import { mentorService } from "../../../service/mentorService";
import { useAuth } from "../../../contexts/authContext";
import "./PerfilMentor.css";
import LOGO from "../../../Assest/unsta.jpg";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import { CarrouselOpiniones } from "./carruselOpiniones/CarrouselOpiniones";
import { Button } from "react-bootstrap";
export const PerfilMentor = () => {
  const { idMentor } = useParams();
  const { token } = useAuth();
  const [mentor, setMentor] = useState(null);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await mentorService.fetchMentor(idMentor, token);
        const dataClases = await mentorService.fetchClasses(idMentor, token);
        setMentor(data);
        setClases(dataClases);
      } catch (err) {
        setError(err.message || "Error al cargar el perfil del mentor");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [idMentor, token]);
  const ErrorPerfil = ({ message }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" color="error">
        Error: {message}
      </Typography>
    </Box>
  );
  console.log(mentor, clases);
  if (loading) {
    return (
      <div>
        <LoadingSpinner />;
      </div>
    );
  }

  if (error) {
    return <ErrorPerfil message={error} />;
  }

  if (!mentor) {
    return <Typography>No se encontró el mentor.</Typography>;
  }

  return (
    <>
      <div className="Container-PerfilMentores">
        <div className="perfil-mentor-nombre-descripcion">
          <div maxWidth="md" className="perfil-mentor-avatar-nombre">
            <Avatar
              src={mentor.Avatar_URL}
              sx={{ height: 170, width: 170, margin: "5px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2>{mentor.Username}</h2>
              <h6
                style={{
                  maxWidth: "350px",
                  fontFamily: "roboto light",
                  fontWeight: 100,
                }}
              >
                {mentor.Carrera}
              </h6>
              <h5>{mentor.University}</h5>
            </div>
          </div>
          <div className="perfil-mentor-info-descripcion">
            <Typography
              variant="h4"
              gutterBottom
              sx={{ alignSelf: "center", fontWeight: "bold" }}
            >
              Acerca de mi
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ paddingX: "30px" }}>
              {mentor.Description}
            </Typography>
          </div>
        </div>
        <div className="perfil-mentor-buttons-sede">
          <div className="perfil-mentor-sede">
            <Typography variant="h6" gutterBottom>
              Sede: Campus YB
            </Typography>
            <img src={LOGO} alt="Sede" style={{ width: "300px" }} />
          </div>
          <div className="perfil-mentor-buttons">
            <Button sx={{ margin: "20px" }}>Ver clases disponibles</Button>
            <Button sx={{ margin: "20px" }}>Contactar</Button>
          </div>
        </div>
        <div className="perfil-mentor-opiniones-clases">
          <div className="perfil-mentor-opiniones">
            <CarrouselOpiniones opiniones={mentor.Rating} />
          </div>
          <div className="perfil-mentor-clases">
            <Typography variant="h7" gutterBottom>
              Clases Finalizadas:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ paddingX: "30px" }}>
              {clases.totalClasses}
            </Typography>
            <Typography variant="h7" gutterBottom>
              Clases Activas:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ paddingX: "30px" }}>
              {clases.activeClasses.length}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
