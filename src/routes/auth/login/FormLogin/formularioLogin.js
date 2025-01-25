import React, { useState } from "react";
import { API_URL } from "../../../../auth/constans";
import { useNavigate } from "react-router-dom";
import "./formularioLogin.css";
import showIcon from "../../../../Assest/show.png";
import hideIcon from "../../../../Assest/hide.png";

export const FormularioLogin = ({ onLoginSuccess }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const goTo = useNavigate();

  const handleKeyUp = (event) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
  };

  const handleKeyDown = (event) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorResponse("");

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username, Password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error de autenticación");
      }

      console.log("Login successful");
      onLoginSuccess({
        token: data.token,
        user: data.user,
        storageType: rememberMe ? "local" : "session",
      });

      goTo("/app/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorResponse(
        error.message || "Error de conexión, por favor intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-login-container">
      <div className="auth-login-box">
        <h2 className="auth-login-title">Iniciar sesión</h2>
        {!!errorResponse && (
          <div className="auth-error-message">{errorResponse}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="auth-input-wrapper">
            <input
              placeholder=" "
              className="auth-input-field"
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <label className="auth-input-label">Nombre de usuario</label>
          </div>

          <div className="auth-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input-field"
              placeholder=" "
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <label className="auth-input-label">Contraseña</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="auth-toggle-password"
            >
              <img
                src={showPassword ? hideIcon : showIcon}
                alt={showPassword ? "Ocultar" : "Mostrar"}
              />
            </button>
            {capsLockOn && (
              <div className="auth-caps-warning">Bloq Mayús está activado</div>
            )}
          </div>

          <div className="auth-extra-options">
            <label className="auth-remember-container">
              <input
                type="checkbox"
                className="auth-remember-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordarme
            </label>
            <button
              type="button"
              className="auth-forgot-link"
              onClick={() => goTo("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
