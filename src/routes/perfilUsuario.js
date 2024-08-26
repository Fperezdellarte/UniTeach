import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { API_URL } from '../auth/constans';
import axios from 'axios';
import { Button, Form, Container, Image } from 'react-bootstrap';
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

    const { Avatar_File, ...rest } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('Name', rest.Name);
    formDataToSend.append('Username', rest.Username);
    formDataToSend.append('Mail', rest.Mail);
    formDataToSend.append('Phone', rest.Phone);
    if (Avatar_File) {
      formDataToSend.append('file', Avatar_File); // Append the file with the key 'file'
    }

    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const response = await axios.patch(`${API_URL}/users/${authData.user.idUser}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
          'Authorization': `Bearer ${authData.token}` // Include token if needed
        }
      });

      if (response.status === 200) {
        console.log('Profile updated successfully');
        
        // Update localStorage with new user data
        const updatedUser = response.data.user;
        localStorage.setItem('authData', JSON.stringify({ ...authData, user: updatedUser }));
        
        // Update formData state with new data
        setFormData({
          ...formData,
          ...updatedUser,
        });
        
        // Optionally, handle success (e.g., show a message or redirect)
      } else {
        console.error('Error updating profile');
        // Optionally, handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Optionally, handle network error
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

          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default PerfilUsuario;
