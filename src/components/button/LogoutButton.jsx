import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LoadingSpinner from "../loading/LoadingSpinner";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmLogout = async () => {
    setLoading(true);
    try {
      await handleLogout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <div variant="contained" color="error" onClick={handleClickOpen}>
        Cerrar sesión
      </div>

      <Dialog open={open} onClose={handleClose}>
        {loading ? (
          <LoadingSpinner fullPage />
        ) : (
          <>
            <DialogTitle>Confirmar cierre de sesión</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas cerrar sesión?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleConfirmLogout} color="error" autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default LogoutButton;
