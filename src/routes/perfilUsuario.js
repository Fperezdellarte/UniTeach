import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/navbar';
import { API_URL } from '../auth/constans';
import axios from 'axios';
import { Button, Form, Container, Image, Alert, Spinner, Modal } from 'react-bootstrap';
import '../styles/PerfilUsuario.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

const PerfilUsuario = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Username: '',
    Mail: '',
    Phone: '',
    Avatar_URL: '',
    Avatar_File: null,
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPasswordReset, setLoadingPasswordReset] = useState(false);
  const [passwordResetMessage, setPasswordResetMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));

    if (authData && authData.user) {
      setFormData({
        Name: authData.user.Name || '',
        Username: authData.user.Username || '',
        Mail: authData.user.Mail || '',
        Phone: authData.user.Phone || '',
        Avatar_URL: authData.user.Avatar_URL || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, Avatar_File: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSave(true); // Inicia la carga para Guardar cambios

    const { Avatar_File, ...rest } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('Name', rest.Name);
    formDataToSend.append('Username', rest.Username);
    formDataToSend.append('Mail', rest.Mail);
    formDataToSend.append('Phone', rest.Phone);
    if (Avatar_File) {
      formDataToSend.append('file', Avatar_File); // Agregar el archivo con la clave 'file'
    }

    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const response = await axios.patch(`${API_URL}/users/${authData.user.idUser}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para subir archivos
          'Authorization': `Bearer ${authData.token}` // Incluir el token si es necesario
        }
      });

      if (response.status === 200) {
        // Actualización exitosa
        const updatedUser = response.data.user;
        localStorage.setItem('authData', JSON.stringify({ ...authData, user: updatedUser }));
        
        setFormData({
          ...formData,
          ...updatedUser,
        });
        
        setModalMessage('Perfil actualizado correctamente');
        setShowModal(true);
      } else {
        setModalMessage('Error al actualizar el perfil');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setModalMessage('Error de red al actualizar el perfil');
      setShowModal(true);
    } finally {
      setLoadingSave(false); // Termina la carga para Guardar cambios
    }
  };

  const handlePasswordReset = async () => {
    setLoadingPasswordReset(true); // Inicia la carga para Cambiar Contraseña
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      await axios.post(`${API_URL}/password-reset`, { email: formData.Mail }, {
        headers: {
          'Authorization': `Bearer ${authData.token}`
        }
      });
      setPasswordResetMessage('Hemos enviado un enlace a tu correo para cambiar la contraseña.');
    } catch (error) {
      setPasswordResetMessage('Ocurrió un error al enviar el enlace. Inténtalo de nuevo.');
    } finally {
      setLoadingPasswordReset(false); // Termina la carga para Cambiar Contraseña
    }
  };

  return (
    <div>
       <Navbar />
      <Container className="my-4">
        <h2 className="perfilusuario-h2 mb-4">Perfil de Usuario</h2>
        <Form onSubmit={handleSubmit} className="perfilusuario-profile-form">
          <Form.Group controlId="formName" className="perfilusuario-form-group">
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder=" " // Placeholder vacío para el efecto de etiqueta flotante
              className={formData.Name ? 'filled' : ''}
            />
            <Form.Label className={formData.Name ? 'filled' : ''}>Nombre</Form.Label>
          </Form.Group>

          <Form.Group controlId="formUsername" className="perfilusuario-form-group">
            <Form.Control
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              placeholder=" " // Placeholder vacío para el efecto de etiqueta flotante
              className={formData.Username ? 'filled' : ''}
            />
            <Form.Label className={formData.Username ? 'filled' : ''}>Username</Form.Label>
          </Form.Group>

          <Form.Group controlId="formMail" className="perfilusuario-form-group">
            <Form.Control
              type="email"
              name="Mail"
              value={formData.Mail}
              onChange={handleChange}
              placeholder=" " // Placeholder vacío para el efecto de etiqueta flotante
              className={formData.Mail ? 'filled' : ''}
            />
            <Form.Label className={formData.Mail ? 'filled' : ''}>Correo</Form.Label>
          </Form.Group>

          <Form.Group controlId="formPhone" className="perfilusuario-form-group">
            <Form.Control
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder=" " // Placeholder vacío para el efecto de etiqueta flotante
              className={formData.Phone ? 'filled' : ''}
            />
            <Form.Label className={formData.Phone ? 'filled' : ''}>Teléfono</Form.Label>
          </Form.Group>

          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            {formData.Avatar_URL && (
              <div className="mb-2">
                <Image
                  src={formData.Avatar_URL}
                  alt="Avatar"
                  roundedCircle
                  width={100}
                  height={100}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="Avatar_File"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loadingSave}>
            {loadingSave ? <Spinner animation="border" size="sm" /> : 'Guardar cambios'}
          </Button>

          <Button variant="link" onClick={handlePasswordReset} disabled={loadingPasswordReset}>
            {loadingPasswordReset ? <Spinner animation="border" size="sm" /> : 'Cambiar Contraseña'}
          </Button>
          
          {passwordResetMessage && (
            <Alert variant="info" className="mt-3">
              {passwordResetMessage}
            </Alert>
          )}
        </Form>
      </Container>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualización de perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PerfilUsuario;


