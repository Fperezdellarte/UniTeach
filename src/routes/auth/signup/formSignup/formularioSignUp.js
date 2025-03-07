import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./formularioSignUp.css";
import { registerUser } from "../../../../service/authService";
import { CircularProgress } from "@mui/material";
import { useCareers } from "../../../../hooks/useCareers";
import { useTheme } from "../../../../contexts/themeContext";
export const FormularioSignUp = ({ setShowAlert }) => {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    careers,
    loading: loadingCareers,
    error: errorCareers,
  } = useCareers();
  const { darkMode, theme } = useTheme();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Name: "",
    DNI: "",
    Legajo: "",
    TypeOfUser: "",
    Mail: "",
    Phone: "",
    University: "",
    Career: "",
  });

  const [errors, setErrors] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Name: "",
    DNI: "",
    Legajo: "",
  });

  useEffect(() => {
    const handleCapsLock = (event) => {
      if (event instanceof KeyboardEvent) {
        setCapsLockOn(event.getModifierState("CapsLock"));
      }
    };

    document.addEventListener("keydown", handleCapsLock);
    document.addEventListener("keyup", handleCapsLock);

    return () => {
      document.removeEventListener("keydown", handleCapsLock);
      document.removeEventListener("keyup", handleCapsLock);
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "Password" && value !== formData.ConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        ConfirmPassword: "Las contraseñas no coinciden.",
      }));
    }
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
        message:
          "El nombre de usuario no puede contener caracteres especiales.",
      },
      Password: {
        regex: /^(?=.*[A-Z]).{8,25}$/,
        message:
          "La contraseña debe contener al menos una letra mayúscula y tener entre 8 y 25 caracteres.",
      },
      ConfirmPassword: {
        regex: new RegExp(`^${formData.Password}$`),
        message: "Las contraseñas no coinciden.",
      },
      Name: {
        regex: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/,
        message: "El nombre solo puede contener letras y espacios.",
      },
      DNI: {
        regex: /^[0-9]{6,8}$/,
        message:
          "El DNI debe contener solo números y tener entre 6 y 8 dígitos.",
      },
      Legajo: {
        regex: /^[a-zA-Z0-9]{1,10}$/,
        message:
          "El legajo debe contener solo letras y números, con un máximo de 10 caracteres.",
      },
      Phone: {
        regex: /^[0-9]{10}$/,
        message: "El número debe contener solo números, con 10 dígitos.",
      },
    };

    // Ignorar validación si es opcional y está vacío
    if (field === "Phone" && value.trim() === "") return true;

    if (validations[field] && !validations[field].regex.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: validations[field].message }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        hasError = true;
      }
    });

    if (hasError) return;
    setLoading(true);
    try {
      await registerUser(formData);
      setShowAlert(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      setErrors(error.errors || {});
    }
    setLoading(false);
  };

  const renderField = (
    id,
    label,
    type = "text",
    placeholder = "",
    options = null
  ) => {
    const value = formData[id];
    const error = errors[id];
    const isFocused = focusedField === id;

    return (
      <div
        className={`signup-group ${isFocused ? "focused" : ""} ${
          error ? "error" : ""
        }`}
      >
        <label
          htmlFor={id}
          className="signup-label"
          style={{
            backgroundColor: darkMode ? theme.palette.background.paper : "",
            color: darkMode ? theme.palette.text.primary : "",
          }}
        >
          {label}
          {id === "Password" && capsLockOn && focusedField === "Password" && (
            <span className="signup-warning">⚠️ Bloq Mayús activado</span>
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
            style={{
              backgroundColor: darkMode ? theme.palette.background.paper : "",
              color: darkMode ? theme.palette.text.primary : "",
            }}
          >
            <option value="">{placeholder || "Elige una opción"}</option>
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
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
              required={id !== "Phone"}
              style={{
                backgroundColor: darkMode ? theme.palette.background.paper : "",
                color: darkMode ? theme.palette.text.primary : "",
              }}
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
      <div
        className="signup-card"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <h1
          className="signup-title"
          style={{ color: darkMode ? theme.palette.text.primary : "" }}
        >
          Registro de Usuario
        </h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-column">
            {renderField(
              "Username",
              "Nombre de usuario",
              "text",
              "Ej: Juanceto01"
            )}
            {renderField(
              "Password",
              "Contraseña",
              "password",
              "Mín. 8 caracteres, 1 mayúscula"
            )}
            {renderField(
              "ConfirmPassword",
              "Confirmar Contraseña",
              "password",
              "Repite tu contraseña"
            )}
            {renderField("Name", "Nombre", "text", "Ej: Alvaro Reina")}
            {renderField(
              "Mail",
              "Correo Electrónico",
              "email",
              "ejemplo@gmail.com"
            )}
            {renderField("Phone", "Teléfono", "tel", "Ej: 3819877663")}
          </div>
          <div className="signup-column">
            {loadingCareers ? (
              <p>Cargando carreras...</p>
            ) : errorCareers ? (
              <p>Error al cargar carreras</p>
            ) : Array.isArray(careers) && careers.length > 0 ? (
              renderField(
                "Career",
                "Carrera",
                "select",
                "Elige una opción",
                careers.map((career) => [career.id.toString(), career.nombre])
              )
            ) : (
              <p>No hay carreras disponibles</p>
            )}
            {renderField(
              "University",
              "Universidad",
              "select",
              "Elige una opción",
              [
                ["UNT", "UNT"],
                ["UNSTA", "UNSTA"],
                ["UTN", "UTN"],
              ]
            )}
            {renderField(
              "TypeOfUser",
              "Tipo de Usuario",
              "select",
              "Elige una opción",
              [
                ["ALUMNO", "Alumno"],
                ["MENTOR", "Mentor"],
                ["AMBOS", "Ambos"],
              ]
            )}
            {renderField("DNI", "DNI", "text", "Máx. 8 dígitos")}
            {renderField("Legajo", "Legajo", "text", "Máx. 8 caracteres")}
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Registrarse"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
