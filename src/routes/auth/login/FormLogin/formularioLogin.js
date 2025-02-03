import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formularioLogin.css";
import { loginUser } from "../../../../service/authService";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorResponse("");

    try {
      const data = await loginUser({ Username, Password });
      console.log("Login successful");
      onLoginSuccess({
        token: data.token,
        user: data.user,
      });
      goTo("/app/home");
    } catch (error) {
      setErrorResponse(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              onClick={() => goTo("/auth/email-form")}
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
