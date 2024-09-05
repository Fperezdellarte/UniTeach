import React, { useEffect } from 'react';
import '../styles/landingPage.css';
import Navbar from '../components/navbar';
import CarouselComponent from '../components/CarouselComponent';
import { Accordion, AccordionBody } from 'react-bootstrap';
import MarqueeCarousel from '../components/MarqueeCarousel';

const LandingPage = () => {
  
  useEffect(() => {
    // Selecciona el grupo de tarjetas
    const cardGroup = document.querySelector('.uni-teach-card-group');

    // Crea el Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // El div está en vista, reaparece
          cardGroup.classList.remove('fade-out');
        } else {
          // El div ha salido de vista, se desvanece
          cardGroup.classList.add('fade-out');
        }
      });
    }, {
      threshold: 0.1 // Ajusta la cantidad visible para disparar el evento
    });

    // Observa el contenedor de las tarjetas
    if (cardGroup) {
      observer.observe(cardGroup);
    }

    // Cleanup: Desmonta el observer cuando el componente se desmonte
    return () => {
      if (cardGroup) {
        observer.unobserve(cardGroup);
      }
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="opacidad">
        <Navbar />
        <CarouselComponent />
        <section>

          <div className="uni-teach-card-group">
            {/* Tarjeta UNSTA */}
            <div className="card shadow-drop-center">
              <img
                src="https://www.unsta.edu.ar/wp-content/uploads/2023/08/unsta-campus-yb.png"
                alt="UNSTA"
                className="card-img-top"
              />
              <div className="card__content">
                <p className="card__title">Conexión</p>
                <p className="card__description">
                  De esta manera conectamos las Universidades de Tucumán.
                </p>
              </div>
            </div>

            {/* Tarjeta UNT */}
            <div className="card shadow-drop-center">
              <img
                src="https://media.licdn.com/dms/image/C4E1BAQEyl2j7GtRoYg/company-background_10000/0/1593164654141/universidad_nacional_de_tucum_n_cover?e=2147483647&v=beta&t=TVTosgL1vAIqpxNDpy6-AgCfflm6ESs8ZBiyW3g9jrM"
                alt="UNT"
                className="card-img-top"
              />
              <div className="card__content">
                <p className="card__title">Innovación</p>
                <p className="card__description">
                  Una manera simple y rápida de agendar tus clases con tus mentores favoritos.
                </p>
              </div>
            </div>

            {/* Tarjeta UTN */}
            <div className="card shadow-drop-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg/1200px-Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg"
                alt="UTN"
                className="card-img-top"
              />
              <div className="card__content">
                <p className="card__title">Simple</p>
                <p className="card__description">
                  Tan simple como un solo clic, tienes a tu alcance todo el material disponible, para sacarte esa materia fundadora.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Testimonios con Marquee */}
        <MarqueeCarousel />
      
        {/* Sección FAQ */}
        <section className="faq-section">
          <h2>Preguntas Frecuentes</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>¿Qué es Uniteach?</Accordion.Header>
              <Accordion.Body>
                Uniteach es una plataforma que conecta a los estudiantes con mentores dentro de la universidad, permitiendo agendar clases y descargar material de estudio.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>¿Cómo puedo agendar una clase?</Accordion.Header>
              <Accordion.Body>
                Puedes agendar una clase fácilmente a través de la plataforma seleccionando el mentor y el horario que mejor se adapte a tus necesidades.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>¿Es Uniteach gratuito?</Accordion.Header>
              <Accordion.Body>
                Sí, Uniteach es completamente gratuito para todos los estudiantes de las universidades afiliadas.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>¿Puedo ser mentor y alumno a la vez?</Accordion.Header>
              <AccordionBody>Si, siempre y cuando accedas al perfil adecuado.</AccordionBody>
            </Accordion.Item>
          </Accordion>
        </section>
        
        {/* Formulario de Suscripción */}
        <section className="subscription-section">
          <form className="form">
            <span className="title">Suscríbete a nuestro newsletter.</span>
            <p className="description">
              Mantente al día con nuestras últimas actualizaciones, noticias.
            </p>
            <div>
              <input placeholder="Ingresa tu email" type="email" name="email" id="email-address" />
              <button type="submit">Suscribirse</button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;
