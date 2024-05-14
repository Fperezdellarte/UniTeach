import React from 'react';
import { Col, Card } from 'react-bootstrap';

const TestimonialCard = ({ name, quote }) => {
  return (
    <Col sm={6}>
      <Card className="mb-3 testimonial-card">
        <Card.Body>
          <Card.Title style={{ fontSize: '2rem', marginBottom: '10px' }}>{name}</Card.Title>
          <Card.Text className="lead">{quote}</Card.Text>
          <Card.Text className="font-italic">- {name}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TestimonialCard;