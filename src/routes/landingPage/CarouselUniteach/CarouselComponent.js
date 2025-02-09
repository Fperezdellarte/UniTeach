import React from "react";
import { Carousel, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./carousel.css";
import { useAuth } from "../../../contexts/authContext";

const CarouselComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (auth.isAuthenticated) {
      navigate("/app/home");
    } else {
      navigate("/auth/signup");
    }
  };
  return (
    <Carousel>
      {/* Slide 1 */}
      <Carousel.Item>
        <div className="contenedor slide-1">
          <Row className="hero-section justify-content-center text-center mb-5">
            <Col lg={8}>
              <h1 className="display-1 custom-title tracking-in-expand-forward-bottom">
                Bienvenido a Uniteach
              </h1>
              <Button
                onClick={handleButtonClick}
                variant="primary"
                size="lg"
                className="primary-button shadow-drop-center"
              >
                {auth.isAuthenticated ? "Ir al Mi Tablero" : "¡Comienza Ahora!"}
              </Button>
            </Col>
          </Row>
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <div className="contenedor slide-2">
          <Row className="features-section mt-5">
            <Col lg={12}>
              <h1 className="display-3 text-white">
                Características Principales
              </h1>
              <ul className="list-unstyled features-text">
                <li>Conecta con mentores en diversas materias.</li>
                <li>Programa clases según tu disponibilidad.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <div className="contenedor slide-3">
          <Row className="features-section mt-5">
            <Col lg={12}>
              <h2 className="display-4 text-white">
                Accede a todo el contenido
              </h2>
              <ul className="list-unstyled features-text">
                <li>Accede a materiales de estudio.</li>
                <li>
                  Recibe retroalimentación personalizada en tus áreas de
                  estudio.
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
