import React from 'react';
import { Card } from 'react-bootstrap';

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

export default TestimonialCard;
