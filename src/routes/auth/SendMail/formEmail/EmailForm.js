import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../auth/constans";
import {
  Button,
  Form,
  Alert,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./EmailForm.css";

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(`${API_URL}/users/sendEmail`, {
        email,
      });

      if (response.status === 200) {
        setResponseMessage(
          "El enlace para restablecer tu contraseña ha sido enviado a tu correo."
        );
      } else {
        setResponseMessage(
          "Error al enviar el correo. Verifica el email e inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
      setResponseMessage(
        "Hubo un error de red. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {responseMessage && (
        <Alert
          variant={
            responseMessage.includes("Error")
              ? "email-form-unique-alert-danger"
              : "email-form-unique-alert-info"
          }
        ></Alert>
      )}
      <Form onSubmit={handleSubmit} className="email-form-unique-form">
        <h2>Recuperar contraseña</h2>
        <Form.Group
          controlId="email"
          className="email-form-unique-input-group mb-3"
        >
          <Form.Label>Introduce tu Correo Electrónico</Form.Label>
          <InputGroup>
            <InputGroup.Text className="email-form-unique-input-group-text">
              @
            </InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
              disabled={isLoading}
              className="email-form-unique-form-control email-form-unique-rounded-pill"
            />
          </InputGroup>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="email-form-unique-button w-100 email-form-unique-rounded-pill"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Enviar enlace"
          )}
        </Button>
      </Form>
    </div>
  );
};
