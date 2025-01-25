import React, { useEffect } from "react";
import "./landingPage.css";
import CarouselComponent from "./CarouselUniteach/CarouselComponent";
import MarqueeCarousel from "./marqueeCarousel/MarqueeCarousel";

const LandingPage = () => {
  useEffect(() => {
    const cardGroup = document.querySelector(".uni-teach-card-group");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardGroup.classList.remove("fade-out");
          } else {
            cardGroup.classList.add("fade-out");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

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
        <CarouselComponent />
        <div></div>

        <MarqueeCarousel />

        {/* Formulario de Suscripción */}
        <section className="subscription-section">
          <form className="form">
            <span className="title">Suscríbete a nuestro newsletter.</span>
            <p className="description">
              Mantente al día con nuestras últimas actualizaciones, noticias.
            </p>
            <div>
              <input
                placeholder="Ingresa tu email"
                type="email"
                name="email"
                id="email-address"
              />
              <button type="submit">Suscribirse</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
