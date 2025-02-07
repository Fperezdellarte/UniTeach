import React from "react";
import "./HomeLogueado.css";
import { TablaProximaClase } from "./tableProximaClases/TablaProximaClase";
import { TablaClasesRecientes } from "./tableClasesRecientes/TablaClasesRecientes";
import { Mentores } from "./mentoresRecientes/MentoresRecientes";
import { useTheme, useMediaQuery } from "@mui/material";

export const HomeLogueado = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
            borderRadius: "10px",
            flexGrow: 1,
            width: isMobile ? "410px" : isMedium ? "600px" : "",
          }}
        >
          <TablaProximaClase />
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            flexGrow: 1,
            maxWidth: "450px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
            borderRadius: "10px",
            width: isMobile ? "100%" : "",
          }}
        >
          <TablaClasesRecientes />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
          borderRadius: "10px",
        }}
      >
        <Mentores />
      </div>
    </div>
  );
};
