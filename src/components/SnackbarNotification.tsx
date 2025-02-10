import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
  severity?: "success" | "error" | "warning" | "info";
}

export const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  open,
  message,
  onClose,
  severity = "success",
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
