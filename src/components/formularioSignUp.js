import React, { useState } from 'react';
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";

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

  const goTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (!Username || !Password || !Name || !DNI || !Legajo || !Mail || !University) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Validar nombre de usuario
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(Username)) {
      setUsernameError("El nombre de usuario no puede contener caracteres especiales.");
      
      return;
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[A-Z]).{8,25}$/;
    if (!passwordRegex.test(Password)) {
      setPasswordError("La contraseña debe contener al menos una letra mayúscula y tener entre 8 y 25 caracteres.");
      
      return;
    }

    // Validar nombre
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(Name)) {
      setNameError("El nombre no puede contener números ni caracteres especiales.");
      return;
    }

    // Validar DNI
    const dniRegex = /^[0-9]{6,8}$/;
    if (!dniRegex.test(DNI)) {
      setDniError("El DNI debe contener solo números y tener entre 6 y 8 dígitos.");
      return;
    }

    // Validar legajo
    const legajoRegex = /^[a-zA-Z0-9]{1,10}$/;
    if (!legajoRegex.test(Legajo)) {
      setLegajoError("El legajo debe contener solo letras y números, con un máximo de 10 dígitos.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phone)) {
      setPhoneError("El Numero debe contener solo números, con 10 dígitos.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup`, {
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
        goTo("/login");
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="username">Nombre de usuario:</label><br />
        <input type="text" id="username" name="username" value={Username} onChange={(e) => setUsername(e.target.value)} required /><br />
        {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
        <br/>

        <label htmlFor="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" value={Password} onChange={(e) => setPassword(e.target.value)} required /><br />
        {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        <br/>

        <label htmlFor="name">Nombre:</label><br />
        <input type="text" id="name" name="name" value={Name} onChange={(e) => setName(e.target.value)} required /><br />
        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
        <br/>

        <label htmlFor="dni">DNI:</label><br />
        <input type="text" id="dni" name="dni" value={DNI} onChange={(e) => setDni(e.target.value)} required /><br />
        {dniError && <span style={{ color: 'red' }}>{dniError}</span>}
        <br/>

        <label htmlFor="legajo">Legajo:</label><br />
        <input type="text" id="legajo" name="legajo" value={Legajo} onChange={(e) => setLegajo(e.target.value)} required /><br />
        {legajoError && <span style={{ color: 'red' }}>{legajoError}</span>}
        <br/>
        
        <label htmlFor="userType">Tipo de Usuario:</label><br />
        <select id="userType" name="userType" value={TypeOfUser} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Elige una opcion</option>
          <option value="ALUMNO">Alumno</option>
          <option value="MENTOR">Mentor</option>
          <option value="AMBOS">Ambos</option>
        </select><br /> <br/>

        <label htmlFor="mail">Correo Electrónico:</label><br />
        <input type="email" id="mail" name="mail" value={Mail} onChange={(e) => setMail(e.target.value)} required /><br />
        <br/>

        <label htmlFor="phone">Teléfono:</label><br />
        <input type="tel" id="phone" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} /><br />
        {phoneError && <span style={{ color: 'red' }}>{phoneError}</span>}
        <br/>

        <label htmlFor="university">Universidad:</label><br />
        <select id="university" name="university" value={University} onChange={(e) => setUniversity(e.target.value)} required>
        <option value="">Elige una opcion</option>
          <option value="UNT">UNT</option>
          <option value="UNSTA">UNSTA</option>
          <option value="UTN">UTN</option>
        </select><br /> <br/>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
