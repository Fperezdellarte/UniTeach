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
    <div>  
      <Navbar />
    <div className="landing-page">
      <div className="opacidad">
        <CarouselComponent />
     <div>
   
     </div>
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
    </div>
  );
};

export default LandingPage;
