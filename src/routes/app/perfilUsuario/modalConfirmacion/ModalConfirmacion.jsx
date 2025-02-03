import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const ModalConfirmacion = ({ show, onHide, title, message }) => (
  <Dialog open={show} onClose={onHide}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onHide}>Cerrar</Button>
    </DialogActions>
  </Dialog>
);
