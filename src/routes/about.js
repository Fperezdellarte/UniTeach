import React from 'react';
import Navbar from '../components/navbar';
import '../styles/about.css';
import { Card, Row, Col } from 'react-bootstrap';

const TestimonialCard = ({ name, quote }) => {
  return (
    <Card className="testimonial-card">
      <Card.Body className="card-body">
        <Card.Title className="card-title">{name}</Card.Title>
        <Card.Text className="lead font-italic">{quote}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-body-secondary">Actualizado hace 3 minutos</small>
      </Card.Footer>
    </Card>
  );
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
      <div className='about'>
        <h1>Acerca de Nosotros</h1>
        <p>Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.</p>
        <p>Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.</p>

        {/* Sección de Contacto */}
        <section className="contact-section">
          <h2>Contacto</h2>
          <p>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Correo Electrónico" />
            <textarea placeholder="Mensaje"></textarea>
            <button>Enviar Mensaje</button>
          </form>
        </section>

        {/* Sección de Testimonios */}
        <TestimonialSection />
      </div>
    </div>
  );
};

export default About;
