import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../../contexts/classesContext";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { InfoModal } from "../../../../components/modal/tablaClasesRecientes/infoModal";
import { ClasesRecientesColumns } from "./ClasesRecientesColumns";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: "#115293",
  },
}));

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
          <StyledButton variant="contained" onClick={handleViewMore}>
            Ver clases disponibles
          </StyledButton>
        }
        customStyles={{
          table: { maxWidth: 1200 },
          title: { color: "#1a237e" },
          header: { backgroundColor: "#e8eaf6" },
        }}
      />

      {classesData.recent?.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button
            component={Link}
            to="/app/clases"
            variant="outlined"
            color="primary"
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
