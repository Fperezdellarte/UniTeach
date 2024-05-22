import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';
import TestimonialCard from '../components/TestimonialCard'; // Asegúrate de que la ruta es correcta
import Navbar from '../components/navbar'; // Asegúrate de que la ruta es correcta

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="opacidad">
      <Navbar/>
      <div className="contenedor">
        {/* Sección de Bienvenida (Hero Section) */}
        <Row className="hero-section justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="display-1 custom-title tracking-in-expand-forward-bottom">Bienvenido a Uniteach</h1>
            <h3 className="descripcion">Encuentra mentores entre tus compañeros de universidad para mejorar tus habilidades académicas</h3>
            {/* Aquí está el botón */}
            <Button 
              as={Link} 
              to="/signup" 
              variant="secondary" 
              size="lg" 
              className="custom-button shadow-drop-center"
            > 
              ¡Comienza Ahora! 
            </Button>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="features-section mt-5">
          <Col lg={12}>
            <h1 className="display-4 text-white">Características Principales</h1>
            <ul className="list-unstyled features-text">
              <li>Conecta con mentores expertos en diversas materias.</li>
              <li>Programa clases según tu disponibilidad.</li>
              <li>Accede a materiales de estudio y recursos útiles.</li>
              <li>Recibe retroalimentación personalizada en tus áreas de estudio.</li>
            </ul>
          </Col>
        </Row>
        {/* Testimonials Section */}
        <Row className="testimonial-card-container justify-content-center">
          <h2 className="text-center text-white">Testimonios de Usuarios</h2>
          <Col xs={12} className="d-flex justify-content-center flex-wrap">
            <TestimonialCard name="Juan Pérez" quote="Gracias a Uniteach, he mejorado mis habilidades en matemáticas y ahora estoy más confiado para mis exámenes." />
            <TestimonialCard name="María Gutiérrez" quote="Encontré a un excelente mentor de programación que me ayudó a entender conceptos difíciles de una manera clara y sencilla." />
            <TestimonialCard name="Carlos Paez" quote="Una de las mejores herramientas para el aprendizaje de manera versátil." />
          </Col>
        </Row>
        </div>
    </div>
    </div>
  );
};

export default LandingPage;
