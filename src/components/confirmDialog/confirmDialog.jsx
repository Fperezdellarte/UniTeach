import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          disabled={loading}
          loading={loading}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
