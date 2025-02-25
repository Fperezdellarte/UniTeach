import React, { useState, useEffect } from "react";
import { passwordService } from "../../../../service/usuarioService";
import { Form, Spinner } from "react-bootstrap";
import Modal from "react-modal";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "./EmailForm.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

export const EmailForm = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
        type: "success"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await passwordService.sendResetEmail(email);
            setEmail("");
            setModalContent({
                title: "Correo enviado",
                message: "Hemos enviado un enlace de recuperación a tu correo electrónico.",
                type: "success"
            });
            setModalIsOpen(true);
        } catch (error) {
            setModalContent({
                title: "Error",
                message: error.message || "Ocurrió un error al enviar el correo.",
                type: "error"
            });
            setModalIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };
    const handelModalClose = () => { 
       Navigate("/auth/login");
        setModalIsOpen(false);
    }
    return (
        <div className="email-form-container">
            <Form onSubmit={handleSubmit} className="email-form-wrapper">
                <h2 className="email-form-title">Recuperar contraseña</h2>
                <p className="email-form-subtitle">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <div className="email-form-input-group">
                    <label className="email-form-label">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        required
                        disabled={isLoading}
                        className="email-form-input"
                    />
                </div>

                <button
                    type="submit"
                    className="email-form-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner
                            animation="border"
                            size="sm"
                            className="loading-spinner"
                        />
                    ) : (
                        "Enviar enlace de recuperación"
                    )}
                </button>
            </Form>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="email-form-modal"
                overlayClassName="email-form-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-icon">
                    {modalContent.type === "success" ? (
                        <FiCheckCircle className="modal-icon-success" />
                    ) : (
                        <FiAlertCircle className="modal-icon-error" />
                    )}
                </div>
                <h3 className="modal-title">{modalContent.title}</h3>
                <p className="modal-message">{modalContent.message}</p>
                <button
                    className="modal-close-button"
                    onClick={handelModalClose}
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
};