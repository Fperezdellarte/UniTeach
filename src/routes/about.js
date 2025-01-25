import '../styles/about.css';
import React, { useState } from 'react';
import Navbar from '../components/navbar';


const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleFeedbackClick = () => {
    const recipient = "uniteach24@gmail.com";
    const subject = encodeURIComponent("Comentario sobre Uniteach");
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}`;
    window.open(gmailLink, "_blank");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Navbar />
      <div className="about-contact-section">
        <div className="content-wrapper">
          {/* Sección Acerca de Nosotros */}
          <div className="about-card">
            <div className="card-header">
              <span className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" fill="currentColor"/>
                </svg>
              </span>
              <h2>Acerca de Nosotros</h2>
            </div>
            <div className="glass-card">
              <p className="featured-text">
                Somos <span className="highlight">Uniteach</span>
              </p>
              <p className="description">
                Una plataforma innovadora creada por estudiantes para estudiantes, 
                facilitando conexiones significativas en el ámbito académico.
              </p>
              <div className="mission-box">
                <h3>Nuestra Misión</h3>
                <p>
                  Empoderar a los estudiantes con herramientas y conexiones que 
                  revolucionen el aprendizaje colaborativo y la resolución de problemas.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div className="contact-card">
            <div className="card-header">
              <span className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" fill="currentColor"/>
                </svg>
              </span>
              <h2>Contacto</h2>
            </div>
            <div className="glass-card">
              <p className="contact-intro">¿Tienes alguna pregunta o comentario?</p>
              <form className="modern-form">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono (opcional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tu mensaje"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="submit-btn"
                onClick={handleFeedbackClick}
              >
                Enviar Mensaje
            </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;