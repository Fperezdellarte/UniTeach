import React, { useState, useEffect } from 'react';
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";
import '../styles/formularioSignUp.css';

export const FormularioSignUp = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Name: '',
    DNI: '',
    Legajo: '',
    TypeOfUser: '',
    Mail: '',
    Phone: '',
    University: ''
  });

  const [errors, setErrors] = useState({
    Username: '',
    Password: '',
    Name: '',
    DNI: '',
    Legajo: '',
    Phone: ''
  });

  const [capsLockOn, setCapsLockOn] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const navigate = useNavigate();

  // Detectar Caps Lock
  useEffect(() => {
    const handleCapsLock = (event) => {
      setCapsLockOn(event.getModifierState('CapsLock'));
    };

    document.addEventListener('keydown', handleCapsLock);
    document.addEventListener('keyup', handleCapsLock);

    return () => {
      document.removeEventListener('keydown', handleCapsLock);
      document.removeEventListener('keyup', handleCapsLock);
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateField = (field, value) => {
    const validations = {
      Username: {
        regex: /^[a-zA-Z0-9]+$/,
        message: "El nombre de usuario no puede contener caracteres especiales."
      },
      Password: {
        regex: /^(?=.*[A-Z]).{8,25}$/,
        message: "La contraseña debe contener al menos una letra mayúscula y tener entre 8 y 25 caracteres."
      },
      Name: {
        regex: /^[a-z A-Z]+$/,
        message: "El nombre no puede contener números ni caracteres especiales."
      },
      DNI: {
        regex: /^[0-9]{6,8}$/,
        message: "El DNI debe contener solo números y tener entre 6 y 8 dígitos."
      },
      Legajo: {
        regex: /^[a-zA-Z0-9]{1,10}$/,
        message: "El legajo debe contener solo letras y números, con un máximo de 10 dígitos."
      },
      Phone: {
        regex: /^[0-9]{10}$/,
        message: "El Número debe contener solo números, con 10 dígitos."
      }
    };

    if (validations[field] && !validations[field].regex.test(value)) {
      setErrors(prev => ({ ...prev, [field]: validations[field].message }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    // Validar todos los campos
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        hasError = true;
      }
    });

    if (hasError) return;

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Respuesta del servidor:', await response.json());
        navigate("/login");
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const renderField = (id, label, type = "text", placeholder = "", options = null) => {
    const value = formData[id];
    const error = errors[id];
    const isFocused = focusedField === id;

    return (
      <div className={`signup-group ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
        <label htmlFor={id} className="signup-label">
          {label}
          {id === 'Password' && capsLockOn && (
            <span className="signup-warning">
              ⚠️ Bloq Mayús activado
            </span>
          )}
        </label>
        {options ? (
          <select
            id={id}
            className="signup-select"
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            onFocus={() => handleFocus(id)}
            onBlur={handleBlur}
            required
          >
            <option value="">{placeholder || "Elige una opción"}</option>
            {options.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        ) : (
          <div className="signup-input-container">
            <input
              type={type}
              id={id}
              className="signup-input"
              value={value}
              onChange={(e) => handleChange(id, e.target.value)}
              onFocus={() => handleFocus(id)}
              onBlur={handleBlur}
              placeholder={placeholder}
              required
            />
            <div className="signup-focus-effect"></div>
          </div>
        )}
        {error && <span className="signup-error-message">{error}</span>}
      </div>
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-column">
            {renderField("Username", "Nombre de usuario", "text", "Ej: Juanceto01")}
            {renderField("Password", "Contraseña", "password", "Mín. 8 caracteres, 1 mayúscula")}
            {renderField("Name", "Nombre", "text", "Ej: Alvaro Reina")}
            {renderField("Mail", "Correo Electrónico", "email", "ejemplo@gmail.com")}
            {renderField("Phone", "Teléfono", "tel", "Ej: 3819877663")}
          </div>
          <div className="signup-column">
            {renderField("TypeOfUser", "Tipo de Usuario", "select", "Elige una opción", [
              ["ALUMNO", "Alumno"],
              ["MENTOR", "Mentor"],
              ["AMBOS", "Ambos"]
            ])}
            {renderField("University", "Universidad", "select", "Elige una opción", [
              ["UNT", "UNT"],
              ["UNSTA", "UNSTA"],
              ["UTN", "UTN"]
            ])}
            {renderField("DNI", "DNI", "text", "Máx. 8 dígitos")}
            {renderField("Legajo", "Legajo", "text", "Máx. 8 caracteres")}
          </div>
          <button type="submit" className="signup-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
