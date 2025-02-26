import React, { useContext } from "react";
import { useMediaQuery, Box } from "@mui/material";
import { useTheme } from "../../../contexts/themeContext";
import { TablaProximaClase } from "./tableProximaClases/TablaProximaClase";
import { TablaClasesRecientes } from "./tableClasesRecientes/TablaClasesRecientes";
import { Mentores } from "./mentoresRecientes/MentoresRecientes";
import { ClassesContext } from "../../../contexts/classesContext";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import { HomeNewUser } from "./nuevoUsuario/HomeNewUser";

export const HomeLogueado = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const { classesData, loading, error } = useContext(ClassesContext);

  const isNewUser =
    !loading &&
    !error &&
    (!classesData?.upcoming || classesData.upcoming.length === 0) &&
    (!classesData?.recent || classesData.recent.length === 0);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        width: "100dv",
        justifyContent: "center",
        alignItems: "center", // Centra verticalmente
        padding: "20px", // Evita que toque los bordes
      }}
    >
      {" "}
      {isNewUser ? (
        <HomeNewUser />
      ) : (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                padding: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
                borderRadius: "10px",
                backgroundColor: theme.palette.background.paper,
                flexGrow: 1,
                maxWidth: isMobile ? "100%" : "calc(100% - 30% - 20px)",
                boxSizing: "border-box",
              }}
            >
              <TablaProximaClase />
            </Box>
            <Box
              sx={{
                padding: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
                borderRadius: "10px",
                width: isMobile ? "100%" : isMedium ? "100%" : "450px",
                maxWidth: "100%",
                backgroundColor: theme.palette.background.paper,
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            >
              <TablaClasesRecientes />
            </Box>
          </div>
          <Box
            sx={{
              display: "flex",
              boxSizing: "border-box",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
              borderRadius: "10px",
              width: "100%",
              backgroundColor: theme.palette.background.paper,
              justifyContent: "center",
            }}
          >
            <Mentores />
          </Box>
        </Box>
      )}
    </div>
  );
};
