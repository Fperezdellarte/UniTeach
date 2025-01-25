import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../auth/constans";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Image,
  Alert,
  Spinner,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaUserEdit,
  FaLock,
} from "react-icons/fa";
import "./FormPerfilUsuario.css";

export const FormPerfilUsuario = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Username: "",
    Mail: "",
    Phone: "",
    Avatar_URL: "",
    Avatar_File: null,
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingPasswordReset, setLoadingPasswordReset] = useState(false);
  const [passwordResetMessage, setPasswordResetMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const authData = JSON.parse(sessionStorage.getItem("authData"));
    if (authData && authData.user) {
      setFormData({
        Name: authData.user.Name || "",
        Username: authData.user.Username || "",
        Mail: authData.user.Mail || "",
        Phone: authData.user.Phone || "",
        Avatar_URL: authData.user.Avatar_URL || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, Avatar_File: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    const { Avatar_File, ...rest } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("Name", rest.Name);
    formDataToSend.append("Username", rest.Username);
    formDataToSend.append("Mail", rest.Mail);
    formDataToSend.append("Phone", rest.Phone);
    if (Avatar_File) {
      formDataToSend.append("file", Avatar_File);
    }

    try {
      const authData = JSON.parse(sessionStorage.getItem("authData"));
      const response = await axios.patch(
        `${API_URL}/users/${authData.user.idUser}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedUser = response.data.user;
        sessionStorage.setItem(
          "authData",
          JSON.stringify({ ...authData, user: updatedUser })
        );
        setFormData({
          ...formData,
          ...updatedUser,
        });
        setModalMessage("Perfil actualizado correctamente");
      } else {
        setModalMessage("Error al actualizar el perfil");
      }
    } catch (error) {
      setModalMessage("Error de red al actualizar el perfil");
    } finally {
      setShowModal(true);
      setLoadingSave(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoadingPasswordReset(true);
    try {
      const authData = JSON.parse(sessionStorage.getItem("authData"));
      await axios.post(
        `${API_URL}/users/sendEmail`,
        { email: formData.Mail },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setPasswordResetMessage(
        "Hemos enviado un enlace a tu correo para cambiar la contraseña."
      );
    } catch (error) {
      console.error("Error enviando el correo:", error);
      setPasswordResetMessage(
        "Ocurrió un error al enviar el enlace. Inténtalo de nuevo."
      );
    } finally {
      setLoadingPasswordReset(false);
    }
  };

  return (
    <div>
      <Container className="perfilusuario-container">
        <h2 className="perfilusuario-title">Perfil de Usuario</h2>
        <Tabs
          defaultActiveKey="profile"
          id="perfil-tab"
          className="perfilusuario-tabs"
        >
          <Tab
            eventKey="profile"
            title={
              <span>
                <FaUserEdit /> Perfil
              </span>
            }
          >
            <Form onSubmit={handleSubmit} className="perfilusuario-form">
              <Form.Group
                controlId="formName"
                className="perfilusuario-form-group"
              >
                <Form.Label>
                  <FaUserCircle /> Nombre
                </Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="formUsername"
                className="perfilusuario-form-group"
              >
                <Form.Label>
                  <FaUserCircle /> Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="formMail"
                className="perfilusuario-form-group"
              >
                <Form.Label>
                  <FaEnvelope /> Correo
                </Form.Label>
                <Form.Control
                  type="email"
                  name="Mail"
                  value={formData.Mail}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="formPhone"
                className="perfilusuario-form-group"
              >
                <Form.Label>
                  <FaPhone /> Teléfono
                </Form.Label>
                <Form.Control
                  type="text"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="formAvatar"
                className="perfilusuario-avatar-group"
              >
                <Form.Label>
                  <FaCamera /> Avatar
                </Form.Label>
                {formData.Avatar_URL && (
                  <Image
                    src={formData.Avatar_URL}
                    roundedCircle
                    width={120}
                    height={120}
                    className="perfilusuario-avatar"
                  />
                )}
                <Form.Control
                  type="file"
                  name="Avatar_File"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loadingSave}>
                {loadingSave ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </Form>
          </Tab>
          <Tab
            eventKey="settings"
            title={
              <span>
                <FaLock /> Configuración
              </span>
            }
          >
            <Button
              variant="link"
              onClick={handlePasswordReset}
              disabled={loadingPasswordReset}
            >
              {loadingPasswordReset ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Cambiar Contraseña"
              )}
            </Button>
            {passwordResetMessage && (
              <Alert variant="info" className="mt-3">
                {passwordResetMessage}
              </Alert>
            )}
          </Tab>
        </Tabs>
      </Container>

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
