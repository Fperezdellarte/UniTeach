import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { passwordService } from "../../../../service/usuarioService";
import { Box, Typography, TextField, Button, IconButton, Paper } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const FormResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      await passwordService.resetPassword({ password, token });
      setMessage("¡Contraseña restablecida con éxito! Redirigiendo...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="75vh" sx={{ backgroundColor: "#f0f7ff", p: 2 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: "24px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          '&:hover': {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.15)"
          }
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#1e3c72" gutterBottom>
          Restablecer tu contraseña
        </Typography>
        <Typography variant="body1" color="#333" gutterBottom>
          Por favor, ingresa tu nueva contraseña para continuar.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nueva contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
            required
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "#fff", fontWeight: "600", transition: "all 0.3s ease", '&:hover': { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(30, 60, 114, 0.4)" } }}>
            Restablecer contraseña
          </Button>
        </form>
        {message && (
          <Typography sx={{ mt: 2, color: message.includes("éxito") ? "green" : "red" }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
