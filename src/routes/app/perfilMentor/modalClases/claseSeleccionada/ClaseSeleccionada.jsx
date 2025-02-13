import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { usuarioService } from "../../../../../service/usuarioService";
import { useAuth } from "../../../../../contexts/authContext";

dayjs.extend(customParseFormat);

export const ClaseSeleccionada = ({ clase, onInscripcionExitosa }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  const handleInscription = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!clase || !clase.idClasses) {
        throw new Error("La clase seleccionada no tiene un ID válido.");
      }

      const response = await usuarioService.inscriptionClass(
        clase.idClasses,
        token
      );

      if (response) {
        setSuccess(true);
        if (onInscripcionExitosa) {
          onInscripcionExitosa();
        }
      } else {
        throw new Error(
          "Error al inscribirse a la clase (respuesta inesperada)."
        );
      }
    } catch (error) {
      // Captura *cualquier* error, incluyendo el nuevo error del backend
      setError(error.message || "Error al inscribirse a la clase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Te has inscrito a la clase exitosamente!
        </Alert>
      )}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mt: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6">{clase.SubjectName}</Typography>
          <Typography>
            <strong>Fecha:</strong>{" "}
            {clase.Date
              ? dayjs(clase.Date)
                  .locale("es")
                  .format("dddd, D [de] MMMM [de] YYYY")
              : "Fecha Inválida"}
          </Typography>
          <Typography>
            <strong>Lugar:</strong> {clase.Place}
          </Typography>
          <Typography>
            <strong>Hora:</strong> {clase.hour}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleInscription}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <>
              Inscribiendo... <CircularProgress size={20} sx={{ ml: 1 }} />
            </>
          ) : (
            "Inscribirme"
          )}
        </Button>
      </Paper>
    </>
  );
};
