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
  const goTo = useNavigate();

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
    <div className="flex max-w-sm mx-auto mt-4">
      <form className="form-login" onSubmit={handleSubmit}>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <h2>Iniciar sesión</h2>
        <div className="form-group mb-3">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="form-group mb-3 position-relative">
          <label htmlFor="password">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" show-password fw-bold position-absolute end-0 top-50"
          >
            <img
              src={showPassword ? hideIcon : showIcon}
              alt={showPassword ? "Ocultar" : "Mostrar"}
              className={showPassword ? "visible" : "hidden"}
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Recordarme
              </label>
            </div>
          </div>

          <div className="il">
            <a
              href="#!"
              className="forgot-password-link"
              onClick={() => goTo("/auth/email-form")}
            >
              Olvidé mi contraseña?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-login fw-bold"
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
  );
};
