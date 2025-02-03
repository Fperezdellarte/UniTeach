import React, { useState, useEffect } from "react";
import { usuarioService } from "../../../../service/usuarioService";
import { useAuth } from "../../../../contexts/authContext";
import {
  Button,
  TextField,
  Alert,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Avatar,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { ModalConfirmacion } from "../modalConfirmacion/ModalConfirmacion";

export const FormPerfilUsuario = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, token, setUser } = useAuth();
  const [formData, setFormData] = useState({
    Name: "",
    Username: "",
    Mail: "",
    Phone: "",
    Avatar_URL: "",
    Avatar_File: null,
  });
  const [errors, setErrors] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPasswordReset, setLoadingPasswordReset] = useState(false);
  const [passwordResetMessage, setPasswordResetMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        Name: user.Name || "",
        Username: user.Username || "",
        Mail: user.Mail || "",
        Phone: user.Phone || "",
        Avatar_URL: user.Avatar_URL || "",
        Avatar_File: null,
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};

    if (!formData.Name.trim()) {
      newErrors.Name = "El nombre es requerido";
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.Name)) {
      newErrors.Name = "El nombre solo puede contener letras, espacios y la ñ";
    }

    if (!formData.Username.trim()) {
      newErrors.Username = "El username es requerido";
    } else if (/\s/.test(formData.Username) || /[ñÑ]/.test(formData.Username)) {
      newErrors.Username =
        "El username no debe contener espacios ni la letra ñ";
    }

    if (!formData.Mail.trim()) {
      newErrors.Mail = "El correo es requerido";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.Mail)) {
      newErrors.Mail = "El correo no es válido";
    }

    if (formData.Phone.trim()) {
      if (!/^\d{10}$/.test(formData.Phone)) {
        newErrors.Phone = "El teléfono debe tener exactamente 10 dígitos";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;
    if (type === "file") {
      newValue = files[0];
      setFormData({ ...formData, Avatar_File: newValue });
    } else {
      setFormData({ ...formData, [name]: newValue });
    }
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoadingSave(true);

    try {
      const updatedUser = await usuarioService.actualizarPerfil(
        user.idUser,
        token,
        formData
      );
      setUser(updatedUser);
      setFormData((prev) => ({ ...prev, ...updatedUser }));
      setModalMessage("Perfil actualizado correctamente");
    } catch (error) {
      setModalMessage(error.message);
    } finally {
      setLoadingSave(false);
      setShowModal(true);
    }
  };

  const handlePasswordReset = async () => {
    setLoadingPasswordReset(true);
    try {
      await usuarioService.solicitarCambioPassword(token, formData.Mail);
      setPasswordResetMessage("Hemos enviado un enlace a tu correo...");
    } catch (error) {
      setPasswordResetMessage(error.message);
    } finally {
      setLoadingPasswordReset(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Perfil de Usuario</Typography>

      <TextField
        label="Nombre"
        name="Name"
        sx={{ width: isMobile ? "100%" : "60%" }}
        value={formData.Name}
        onChange={handleChange}
        error={!!errors.Name}
        helperText={errors.Name}
        InputProps={{
          startAdornment: <BadgeIcon style={{ marginRight: 8 }} />,
        }}
      />

      <TextField
        label="Username"
        name="Username"
        sx={{ width: isMobile ? "100%" : "60%" }}
        value={formData.Username}
        onChange={handleChange}
        error={!!errors.Username}
        helperText={errors.Username}
        InputProps={{
          startAdornment: <AccountCircleIcon style={{ marginRight: 8 }} />,
        }}
      />

      <TextField
        label="Correo"
        name="Mail"
        type="email"
        sx={{ width: isMobile ? "100%" : "60%" }}
        value={formData.Mail}
        onChange={handleChange}
        error={!!errors.Mail}
        helperText={errors.Mail}
        InputProps={{
          startAdornment: <EmailIcon style={{ marginRight: 8 }} />,
        }}
      />

      <TextField
        label="Teléfono"
        name="Phone"
        sx={{ width: isMobile ? "100%" : "60%" }}
        value={formData.Phone}
        onChange={handleChange}
        error={!!errors.Phone}
        helperText={errors.Phone}
        InputProps={{
          startAdornment: <PhoneAndroidIcon style={{ marginRight: 8 }} />,
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {formData.Avatar_URL && (
          <Avatar
            alt="Avatar"
            src={formData.Avatar_URL}
            sx={{ width: 120, height: 120 }}
          />
        )}
        <label htmlFor="avatar-file">
          <input
            style={{ display: "none" }}
            id="avatar-file"
            name="Avatar_File"
            type="file"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<CameraAltOutlinedIcon />}
          >
            Cambiar Avatar
          </Button>
        </label>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loadingSave}
        >
          {loadingSave ? <CircularProgress size={24} /> : "Guardar cambios"}
        </Button>
        <Button
          variant="text"
          onClick={handlePasswordReset}
          disabled={loadingPasswordReset}
        >
          {loadingPasswordReset ? (
            <CircularProgress size={24} />
          ) : (
            "Cambiar Contraseña"
          )}
        </Button>
      </Box>

      {passwordResetMessage && (
        <Alert severity="info">{passwordResetMessage}</Alert>
      )}

      <ModalConfirmacion
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Actualización de perfil"
        message={modalMessage}
      />
    </Box>
  );
};
