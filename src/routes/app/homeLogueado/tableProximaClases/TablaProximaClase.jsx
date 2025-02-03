import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../../contexts/classesContext";
import { useAuth } from "../../../../contexts/authContext";
import axios from "axios";
import { useBuscador } from "../../../../hooks/useBuscador";
import { API_URL } from "../../../../config/constans";
import { Snackbar, Button } from "@mui/material";
import { ConfirmDialog } from "../../../../components/confirmDialog/confirmDialog";
import { FacultyModal } from "../../../../components/modal/tablaProximaClases/FacultyModal";
import { ProximaClasesColumns } from "./ProximaClasesColumns";
import { MuiTableContainer } from "../../../../components/table/tableContainer";

export const TablaProximaClase = () => {
  const { classesData, loading, error } = useContext(ClassesContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { handleSearch } = useBuscador();
  const { token } = useAuth();

  // Configuración de columnas
  const handleOpenDialog = (idInscription) => {
    setSelectedId(idInscription);
    setOpenDialog(true);
  };
  const columns = ProximaClasesColumns(handleOpenDialog);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.delete(`${API_URL}/inscription/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("Te has dado de baja de la clase correctamente");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error al darse de baja");
      setSnackbarOpen(true);
      console.error("Error deleting inscription:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleModalClick = (subject) => {
    handleSearch(subject);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="table-container">
      <MuiTableContainer
        title="Próximas Clases"
        columns={columns}
        data={classesData.upcoming}
        loading={loading}
        error={error}
        emptyMessage={
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
          >
            Empieza Ahora
          </Button>
        }
        customStyles={{
          container: { margin: "20px" },
          title: { color: "#2c3e50", fontSize: "1.5rem" },
          header: { backgroundColor: "#3498db", color: "white" },
        }}
      />

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleUnsubscribe}
        title="Confirmar Baja"
        message="¿Estás seguro de que deseas darte de baja de esta clase?"
      />

      <FacultyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleFacultySelect={handleModalClick}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};
