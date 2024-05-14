import React, { useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap'; // Importa el componente Carousel
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../Estilos/landingPage.css'; // Importa el archivo CSS
import TestimonialCard from '../components/TestimonialCard'; // Importa el componente TestimonialCard

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`bg-light min-vh-100 py-5 ${darkMode ? "dark" : ""}`}>
      <Container>
        <Button onClick={toggleDarkMode} className="ml-2 btn-lg">
          {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          {darkMode ? " Modo Claro" : " Modo Oscuro"}
        </Button>
        {/* Sección de Bienvenida (Hero Section) */}
        <Row className="hero-section justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="display-4 text-primary">Bienvenido a Uniteach</h1>
            <p className="lead text-muted">Encuentra mentores entre tus compañeros de universidad para mejorar tus habilidades académicas.</p>
            <Button as={Link} to="/signup" variant="secondary" size="lg" className="custom-button shadow-drop-center"> ¡Comienza Ahora!  </Button>
          </Col>
        </Row>

        {/* Sección de Características (Features Section) */}
        <Row className="features-section mt-5">
          <Col lg={7}>
            {/* Título con subtítulo */}
            <h1 className="display-4 text-primary">
              Características Principales
            </h1>
            
            <ul className="list-unstyled text-muted features-text">
              <li>Conecta con mentores expertos en diversas materias.</li>
              <li>Programa clases según tu disponibilidad.</li>
              <li>Accede a materiales de estudio y recursos útiles.</li>
              <li>Recibe retroalimentación personalizada en tus áreas de estudio.</li>
            </ul>
          </Col>
        </Row>

        
        {/* Sección de Testimonios (Testimonials Section) */}
        <Row className="justify-content-center">
            <h2 className="text-center text-primary">Testimonios de Usuarios</h2>
          <Col xs={12} className="d-flex justify-content-center">
                <TestimonialCard name="Juan Pérez" quote="Gracias a Uniteach, he mejorado mis habilidades en matemáticas y ahora estoy más confiado para mis exámenes." />
                 <TestimonialCard name="María Gutiérrez" quote="Encontré a un excelente mentor de programación que me ayudó a entender conceptos difíciles de una manera clara y sencilla." />
                <TestimonialCard name="Carlos Paez" quote="Una de las mejores herramientas para el aprendizaje de manera versátil." />           
         </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
