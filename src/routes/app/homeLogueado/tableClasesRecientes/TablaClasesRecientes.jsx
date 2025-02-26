import React, { useContext } from "react";
import { ClassesContext } from "../../../../contexts/classesContext";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { ClasesRecientesColumns } from "./ClasesRecientesColumns";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../contexts/themeContext";
export const TablaClasesRecientes = () => {
  const { classesData, error, loading } = useContext(ClassesContext);
  const { theme } = useTheme();

  const titleColor = theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50";

  return (
    <div className="table-container">
      <MuiTableContainer
        title="Clases Recientes"
        columns={ClasesRecientesColumns}
        data={classesData.recent}
        loading={loading}
        error={error}
        emptyMessage={"No tienes clases anteriores"}
        customStyles={{
          container: {
            maxWidth: "100%",
          },
          title: {
            color: titleColor,
            fontSize: "1.5rem",
            margin: "0px",
            fontWeight: "bold",
            transition: "color 0.3s ease",
          },
          header: { backgroundColor: "#3498db", color: "white" },
        }}
      />

      {classesData.recent?.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button
            component={Link}
            to="/app/clases"
            variant="outlined"
            backgroundColor="primary"
          >
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
};
