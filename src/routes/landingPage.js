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
