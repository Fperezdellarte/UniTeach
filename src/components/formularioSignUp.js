import React, { useState } from 'react';
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/formularioSignUp.css';

export const FormularioSignUp = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [DNI, setDni] = useState('');
  const [Legajo, setLegajo] = useState('');
  const [TypeOfUser, setUserType] = useState('');
  const [Mail, setMail] = useState('');
  const [Phone, setPhone] = useState('');
  const [University, setUniversity] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [dniError, setDniError] = useState('');
  const [legajoError, setLegajoError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;

    // Validar nombre de usuario
    export const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(Username)) {
      setUsernameError("El nombre de usuario no puede contener caracteres especiales.");
      hasError = true;
    } else {
      setUsernameError('');
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[A-Z]).{8,25}$/;
    if (!passwordRegex.test(Password)) {
      setPasswordError("La contraseña debe contener al menos una letra mayúscula y tener entre 8 y 25 caracteres.");
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Validar nombre
    const nameRegex = /^[a-z A-Z]+$/;
    if (!nameRegex.test(Name)) {
      setNameError("El nombre no puede contener números ni caracteres especiales.");
      hasError = true;
    } else {
      setNameError('');
    }

    // Validar DNI
    const dniRegex = /^[0-9]{6,8}$/;
    if (!dniRegex.test(DNI)) {
      setDniError("El DNI debe contener solo números y tener entre 6 y 8 dígitos.");
      hasError = true;
    } else {
      setDniError('');
    }

    // Validar legajo
    const legajoRegex = /^[a-zA-Z0-9]{1,10}$/;
    if (!legajoRegex.test(Legajo)) {
      setLegajoError("El legajo debe contener solo letras y números, con un máximo de 10 dígitos.");
      hasError = true;
    } else {
      setLegajoError('');
    }

    // Validar teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phone)) {
      setPhoneError("El Número debe contener solo números, con 10 dígitos.");
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Username,
          Password,
          Name,
          DNI,
          Legajo,
          TypeOfUser,
          Mail,
          Phone,
          University
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        navigate("/login");
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario:</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              value={Username} 
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(''); // Clear error on change
              }} 
              required 
            />
            {usernameError && <span className="text-danger">{usernameError}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={Password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(''); // Clear error on change
              }} 
              required 
            />
            {passwordError && <span className="text-danger">{passwordError}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={Name} 
              onChange={(e) => {
                setName(e.target.value);
                setNameError(''); // Clear error on change
              }} 
              required 
            />
            {nameError && <span className="text-danger">{nameError}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="dni" className="form-label">DNI:</label>
            <input 
              type="text" 
              className="form-control" 
              id="dni" 
              value={DNI} 
              onChange={(e) => {
                setDni(e.target.value);
                setDniError(''); // Clear error on change
              }} 
              required 
            />
            {dniError && <span className="text-danger">{dniError}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="legajo" className="form-label">Legajo:</label>
            <input 
              type="text" 
              className="form-control" 
              id="legajo" 
              value={Legajo} 
              onChange={(e) => {
                setLegajo(e.target.value);
                setLegajoError(''); // Clear error on change
              }} 
              required 
            />
            {legajoError && <span className="text-danger">{legajoError}</span>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">Tipo de Usuario:</label>
            <select 
              className="form-select" 
              id="userType" 
              value={TypeOfUser} 
              onChange={(e) => setUserType(e.target.value)} 
              required
            >
              <option value="">Elige una opcion</option>
              <option value="ALUMNO">Alumno</option>
              <option value="MENTOR">Mentor</option>
              <option value="AMBOS">Ambos</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="mail" className="form-label">Correo Electrónico:</label>
            <input 
              type="email" 
              className="form-control" 
              id="mail" 
              value={Mail} 
              onChange={(e) => setMail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Teléfono:</label>
            <input 
              type="tel" 
              className="form-control" 
              id="phone" 
              value={Phone} 
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(''); // Clear error on change
              }} 
            />
            {phoneError && <span className="text-danger">{phoneError}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="university" className="form-label">Universidad:</label>
            <select 
              className="form-select" 
              id="university" 
              value={University} 
              onChange={(e) => setUniversity(e.target.value)} 
              required
            >
              <option value="">Elige una opcion</option>
              <option value="UNT">UNT</option>
              <option value="UNSTA">UNSTA</option>
              <option value="UTN">UTN</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-4">Registrarse</button>
        </div>
      </form>
    </div>
  );
};
