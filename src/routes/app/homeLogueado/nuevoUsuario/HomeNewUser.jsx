import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FacultyModal } from "../../../../components/modal/tablaProximaClases/FacultyModal";

export const HomeNewUser = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Box
      sx={{
        textAlign: "center",
        height: "100vh",
        gap: "15px",
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bienvenido a Uniteach
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ahora que ya puedes empezar a aprender y conectarte con cientos de
        alumnos y mentores para aprender y mejorar tus habilidades y
        conocimientos.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Empieza Ahora!
      </Button>
      <FacultyModal show={showModal} onHide={() => setShowModal(false)} />
    </Box>
  );
};
