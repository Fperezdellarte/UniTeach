import React, { useState } from 'react';
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";

export const FormularioSignUp = () => {
  // Definir estados para los campos del formulario
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [DNI, setDni] = useState('');
  const [Legajo, setLegajo] = useState('');
  const [TypeOfUser, setUserType] = useState('');
  const [Mail, setMail] = useState('');
  const [Phone, setPhone] = useState('');
  const [University, setUniversity] = useState('');
  
  const goTo =useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Username || !Password || !Name || !DNI || !Legajo || !Mail || !University) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {

      // Realizar la solicitud POST al servidor
      const response = await fetch(`${API_URL}/users`, {
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
        }) // Convertir el objeto formData a formato JSON
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        goTo("/login");
        // Aquí puedes hacer algo con la respuesta del servidor, como mostrar un mensaje de éxito
      } else {
        // Si la solicitud no fue exitosa, mostrar el mensaje de error
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      // Si hay algún error en la solicitud, mostrar el mensaje de error
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label><br />
        <input type="text" id="username" name="username" value={Username} onChange={(e) => setUsername(e.target.value)} required /><br />

        <label htmlFor="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" value={Password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <label htmlFor="name">Nombre:</label><br />
        <input type="text" id="name" name="name" value={Name} onChange={(e) => setName(e.target.value)} required /><br />

        <label htmlFor="dni">DNI:</label><br />
        <input type="text" id="dni" name="dni" value={DNI} onChange={(e) => setDni(e.target.value)} required /><br />

        <label htmlFor="legajo">Legajo:</label><br />
        <input type="text" id="legajo" name="legajo" value={Legajo} onChange={(e) => setLegajo(e.target.value)} required /><br />

        <label htmlFor="userType">Tipo de Usuario:</label><br />
        <select id="userType" name="userType" value={TypeOfUser} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Elige una opcion</option>
          <option value="ALUMNO">Alumno</option>
          <option value="MENTOR">Mentor</option>
          <option value="AMBOS">Ambos</option>
        </select><br />

        <label htmlFor="mail">Correo Electrónico:</label><br />
        <input type="email" id="mail" name="mail" value={Mail} onChange={(e) => setMail(e.target.value)} required /><br />

        <label htmlFor="phone">*Teléfono:</label><br />
        <input type="tel" id="phone" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} /><br />

        <label htmlFor="university">Universidad:</label><br />
        <select id="university" name="university" value={University} onChange={(e) => setUniversity(e.target.value)} required>
        <option value="">Elige una opcion</option>
          <option value="UNT">UNT</option>
          <option value="UNSTA">UNSTA</option>
          <option value="UTN">UTN</option>
        </select><br />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
