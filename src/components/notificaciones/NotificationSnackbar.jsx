import { Snackbar } from "@mui/material";

export const NotificationSnackbar = ({
  open,
  message,
  onClose,
  duration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
};
