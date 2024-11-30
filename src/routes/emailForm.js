import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap'; // Para un input más moderno

export const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');

    try {
      const response = await axios.post(`${API_URL}/users/sendEmail`, {
        email,
      });

      if (response.status === 200) {
        setResponseMessage('El enlace para restablecer tu contraseña ha sido enviado a tu correo.');
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
    <div className="email-form-container">
      <h2>Recuperar contraseña</h2>
      {responseMessage && <Alert variant={responseMessage.includes('Error') ? 'danger' : 'info'}>{responseMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
              disabled={isLoading}
              className="rounded-pill"
            />
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 rounded-pill" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Enviar enlace'}
        </Button>
      </Form>
    </div>
  );
};


export default EmailForm