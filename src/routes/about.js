  import React from 'react';
  import Navbar from '../components/navbar';
  import '../styles/about.css';
  import { Card, Row, Col, Button } from 'react-bootstrap';

  const TestimonialCard = ({ name, quote }) => {
    return (
      <Card className="testimonial-card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Text className="lead font-italic">{quote}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  const handleFeedbackClick = () => {
    const recipient = "uniteach24@gmail.com";
    const subject = encodeURIComponent("Comentario sobre uniteach aplicación");
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}`;

    window.open(gmailLink, "_blank");
  };

  const TestimonialSection = () => {
    const testimonials = [
      { name: "Juan Pérez", quote: "Gracias a Uniteach, he mejorado mis habilidades en matemáticas y ahora estoy más confiado para mis exámenes." },
      { name: "María Gutiérrez", quote: "Encontré a un excelente mentor de programación que me ayudó a entender conceptos difíciles de una manera clara y sencilla." },
      { name: "Carlos Paez", quote: "Una de las mejores herramientas para el aprendizaje de manera versátil." },
    ];

    return (
      <div className="testimonial-section">
        <h2 className="text-center text-black">Testimonios de Usuarios</h2>
        <Row className="testimonial-card-container justify-content-center">
          {testimonials.map((testimonial, index) => (
            <Col key={index} xs={12} md={4} className="d-flex justify-content-center">
              <TestimonialCard {...testimonial} />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  export const About = () => {
    return (
      <div> 
        <Navbar/>    
        <div className='container-about'>
          <Row>
            {/* Columna para "Acerca de Nosotros" */}
            <Col md={6}>
              <div className='about '>
                <h1 className='text-white'>Acerca de Nosotros</h1>
                <p className='text-white'>Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.</p>
                <p className='text-white'>Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.</p>
              </div>
            </Col>

            {/* Columna para "Contacto" */}
            <Col md={6}>
              <div className="contact">
                <h2 className='text-white'>Contacto</h2>
                <p className='text-white'>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
                  <Button onClick={handleFeedbackClick} className="blue-button">Enviar Mensaje</Button>
              </div>
            </Col>
          </Row>

          {/* Sección de Testimonios */}
          <TestimonialSection />
        </div>
      </div>
    );
  };

  export default About;
