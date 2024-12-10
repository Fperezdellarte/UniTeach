import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap';
import '../styles/emailform.css';

export const EmailForm = () => {
  const [countdown, setCountdown] = useState(1000);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/login");  // Redirige cuando el contador llegue a 0
    } else if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer); // Limpiar el timer
    }
  }, [countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');

    try {
      const response = await axios.post(`${API_URL}/users/sendEmail`, { email });

      if (response.status === 200) {
        setResponseMessage('El enlace para restablecer tu contraseña ha sido enviado a tu correo.');
        setCountdown(5);  // Inicia el contador de 5 segundos
      } else {
        setResponseMessage('Error al enviar el correo. Verifica el email e inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setResponseMessage('Hubo un error de red. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-form-unique-container">
      {responseMessage && (
        <Alert
          variant={responseMessage.includes('Error') ? 'danger' : 'info'}
        >
          {responseMessage} 
          {countdown > 0 && ` Redirigiendo al login en ${countdown} segundos...`}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="email-form-unique-form">
        <h2>Recuperar contraseña</h2>
        <Form.Group controlId="email" className="email-form-unique-input-group mb-3">
          <Form.Label>Introduce tu Correo Electrónico</Form.Label>
          <InputGroup>
            <InputGroup.Text className="email-form-unique-input-group-text">@</InputGroup.Text>
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
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Enviar enlace'}
        </Button>
      </Form>
    </div>
  );
};

export default EmailForm;
