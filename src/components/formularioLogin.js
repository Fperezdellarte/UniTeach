import React, { useState } from 'react';
import { API_URL } from '../auth/constans';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/formularioLogin.css';
import showIcon from '../Assest/show.png';
import hideIcon from '../Assest/hide.png';

export const FormularioLogin = ({ onLoginSuccess }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorResponse, setErrorResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorResponse(''); // Limpiar el mensaje de error anterior

    try {
      const response = await fetch(`${API_URL}/users/login`, {
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
        const data = await response.json();
        console.log("Login successful");

        const { token, user } = data;

        if (rememberMe) {
          sessionStorage.setItem('authData', JSON.stringify({ Username, token, user }));
        } else {
          sessionStorage.setItem('authData', JSON.stringify({ Username, token, user }));
        }

        onLoginSuccess();
        goTo("/home");
      } else {
        // Leer el mensaje de error desde la respuesta JSON
        const json = await response.json();
        setErrorResponse(json.message || 'Error desconocido');
      }

    } catch (error) {
      console.log(error);
      setErrorResponse("Error de conexión, por favor intente de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      <div className='form-box fw-bold'>
        <h2>Iniciar sesión</h2>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <form className="form-login" onSubmit={handleSubmit}>
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
              type={showPassword ? 'text' : 'password'} // Alterna entre text y password
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
                alt={showPassword ? 'Ocultar' : 'Mostrar'}
                className={showPassword ? 'visible' : 'hidden'}
                style={{ width: '24px', height: '24px' }}
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
              <a href="#!" className="forgot-password-link"onClick={() => goTo('/email-form')}>Olvidé mi contraseña?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-login fw-bold"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner-border spinner-border-sm" /> : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
