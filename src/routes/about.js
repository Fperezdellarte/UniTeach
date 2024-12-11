  import React from 'react';
  import Navbar from '../components/navbar';
  import '../styles/about.css';
  import { Row, Col, Button } from 'react-bootstrap';

  const handleFeedbackClick = () => {
    const recipient = "uniteach24@gmail.com";
    const subject = encodeURIComponent("Comentario sobre uniteach aplicación");
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}`;

    window.open(gmailLink, "_blank");
  };


  export const About = () => {
    return (
      <div> 
        <Navbar/>    
        <div className='container-about'>
          <Row>
            {/* Columna para "Acerca de Nosotros" */}
            <Col md={6}>
              <div className='about fw-bold'>
                <h2 className='text-white'>Acerca de Nosotros</h2>
                <p className='text-white'>Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.</p>
                <p className='text-white'>Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.</p>
              </div>
            </Col>

            {/* Columna para "Contacto" */}
            <Col md={6}>
              <div className="contact fw-bold">
                <h2 className='text-white'>Contacto</h2>
                <p className='text-white'>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
                  <Button onClick={handleFeedbackClick} className="blue-button">Enviar Mensaje</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

export default About;
