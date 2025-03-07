import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../../contexts/classesContext";
import { Snackbar } from "@mui/material";
import { ConfirmDialog } from "../../../../components/confirmDialog/confirmDialog";
import { ProximaClasesColumns } from "./ProximaClasesColumns";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { deleteIncripsion } from "../../../../service/clasessService";
import { useAuth } from "../../../../contexts/authContext";
import { useTheme } from "../../../../contexts/themeContext";

export const TablaProximaClase = () => {
  const { classesData, loading, error, fetchClassesData } =
    useContext(ClassesContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { theme } = useTheme();
  const { token } = useAuth();

  const titleColor = theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50";
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
      setLoadingDelete(true);
      await deleteIncripsion(selectedId, token);
      await fetchClassesData();
      setSnackbarMessage("Te has dado de baja de la clase correctamente");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error al darse de baja");
      setSnackbarOpen(true);
      console.error("Error deleting inscription:", error);
    } finally {
      setOpenDialog(false);
      setLoadingDelete(false);
    }
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
        emptyMessage={"No tienes clases próximas"}
        customStyles={{
          container: { width: "100%" },
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

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleUnsubscribe}
        loading={loadingDelete}
        title="Confirmar Baja"
        message="¿Estás seguro de que deseas darte de baja de esta clase?"
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
