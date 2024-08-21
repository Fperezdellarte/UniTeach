import React, { useState } from 'react';
import { API_URL } from '../auth/constans';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/formularioLogin.css';

export const FormularioLogin = ({ onLoginSuccess }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Username,
          Password
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        setErrorResponse("");
        if (rememberMe) {
          localStorage.setItem('authData', JSON.stringify({ Username, Password }));
        } else {
          localStorage.removeItem('authData');
        }
        onLoginSuccess();
        goTo("/home");
      } else {
        console.log("Something went wrong");
        const json = await response.json();
        setErrorResponse(json.body.error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Iniciar sesión</h2>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Recordarme
                </label>
              </div>
            </div>
  
            <div className="il">
              <a href="#!" className="forgot-password-link">Olvidé mi contraseña?</a>
            </div>
          </div>
  
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}  