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

const LogoutButton = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmLogout = async () => {
    try {
      await handleLogout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <div variant="contained" color="error" onClick={handleClickOpen}>
        Cerrar sesión
      </div>

      <Dialog open={open} onClose={handleClose}>
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
      </Dialog>
    </>
  );
};

export default LogoutButton;
