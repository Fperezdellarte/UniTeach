import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../../contexts/classesContext";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { InfoModal } from "../../../../components/modal/tablaClasesRecientes/infoModal";
import { ClasesRecientesColumns } from "./ClasesRecientesColumns";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const TablaClasesRecientes = () => {
  const { classesData, error, loading } = useContext(ClassesContext);
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    if (!classesData.recent?.length) setShowModal(true);
  };

  return (
    <div className="table-container">
      <MuiTableContainer
        title="Clases Recientes"
        columns={ClasesRecientesColumns}
        data={classesData.recent}
        loading={loading}
        error={error}
        emptyMessage={
          <Button variant="contained" onClick={handleViewMore}>
            Ver clases disponibles
          </Button>
        }
        customStyles={{
          container: {
            maxWidth: "100%",
          },
          title: {
            color: "#2c3e50",
            fontSize: "1.5rem",
            margin: " 0px",
            fontWeight: "bold",
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

      <InfoModal
        show={showModal}
        title="No hay clases recientes"
        message="Consulta nuestro catálogo para nuevas disponibilidades"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
