import React, { useState } from 'react';
import { API_URL } from '../auth/constans';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/formularioLogin.css';

export const FormularioLogin = ({ onLoginSuccess }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const auth = useAuth();
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
        onLoginSuccess(); // Llama a la función proporcionada después de un inicio de sesión exitoso
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
    <div>
      <div>
      <h2>Iniciar sesión</h2>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
  );
};
