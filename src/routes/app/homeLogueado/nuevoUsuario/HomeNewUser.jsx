import { FacultyModal } from "../../../../components/modal/tablaProximaClases/FacultyModal";
import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useTheme } from "../../../../contexts/themeContext";
import { styled, keyframes } from "@mui/material/styles";
import { motion } from "framer-motion";

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #1E88E5, #1976D2)",
  padding: "16px 48px",
  borderRadius: "4px",
  color: "white",
  fontSize: "0.95rem",
  letterSpacing: "1px",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.3s ease",
  animation: `${pulseAnimation} 2s infinite`,
  "&:hover": {
    background: "linear-gradient(to right, #1976D2, #1565C0)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(59, 67, 75, 0.94)",
    animation: "none",
  },
}));

const MotionButton = motion(StyledButton);

export const HomeNewUser = () => {
  const { theme, darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        elevation={4}
        sx={{
          background: "#white",
          maxWidth: "480px",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: darkMode
                ? theme.palette.text.primary
                : "rgba(17, 52, 99, 0.89)",

              fontWeight: 600,
              textAlign: "center",
              marginBottom: 1,
            }}
          >
            Bienvenido a Uniteach
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: darkMode
                ? theme.palette.text.primary
                : "rgba(1, 11, 22, 0.93)",
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: 2,
            }}
          >
            Ahora que ya puedes empezar a aprender y conectarte con cientos de
            alumnos y mentores para aprender y mejorar tus habilidades y
            conocimientos.
          </Typography>

          <MotionButton
            variant="contained"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
          >
            ¡EMPIEZA AHORA!
          </MotionButton>
        </Box>
      </Paper>

      <FacultyModal show={showModal} onHide={() => setShowModal(false)} />
    </Box>
  );
};

export default HomeNewUser;
