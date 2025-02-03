import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { passwordService } from "../../../../service/usuarioService";
import "./FormResetPassword.css";

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
    <div className="reset-password-card">
      <h1>Restablecer tu contraseña</h1>
      <p>Por favor, ingresa tu nueva contraseña para continuar.</p>
      <form onSubmit={handleSubmit}>
        {/* Nueva contraseña */}
        <div className="input-group">
          <label htmlFor="password">Nueva contraseña</label>
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Introduce tu nueva contraseña"
            />
          </div>
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {/* Confirmar contraseña */}
        <div className="input-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <div className="password-container">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirma tu contraseña"
            />
          </div>
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <button type="submit" className="submit-button">
          Restablecer contraseña
        </button>
      </form>
      {message && (
        <p className={message.includes("éxito") ? "success" : "error"}>
          {message}
        </p>
      )}
    </div>
  );
};
