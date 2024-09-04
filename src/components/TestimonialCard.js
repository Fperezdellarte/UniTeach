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
