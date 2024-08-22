import React from 'react';
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
      <h2 className="text-center text-white">Testimonios de Usuarios</h2>
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

export default TestimonialSection;
