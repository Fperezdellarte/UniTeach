import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
return (
  <div className='landingPage'>

      {/* Sección de Bienvenida (Hero Section) */}
      <section className="hero-section">
        <h1>Bienvenido a Uniteach</h1>
        <p>Encuentra mentores entre tus compañeros de universidad y programa clases para mejorar tus habilidades académicas.</p>
        <Link to="/signup">
        <button>¡Comienza Ahora!</button>
        </Link>
      </section>

      {/* Sección de Características (Features Section) */}
      <section className="features-section">
        <h2>Características Principales</h2>
        <ul>
          <li>Conecta con mentores expertos en diversas materias.</li>
          <li>Programa clases según tu disponibilidad.</li>
          <li>Accede a materiales de estudio y recursos útiles.</li>
          <li>Recibe retroalimentación personalizada en tus áreas de estudio.</li>
        </ul>
      </section>

      {/* Sección de Testimonios (Testimonials Section) */}
      <section className="testimonials-section">
        <h2>Testimonios de Usuarios</h2>
        <div className="testimonial">
          <p>"Gracias a Uniteach, he mejorado mis habilidades en matemáticas y ahora estoy más confiado para mis exámenes."</p>
          <p>- Juan Pérez</p>
        </div>
        <div className="testimonial">
          <p>"Encontré a un excelente mentor de programación que me ha ayudado a entender conceptos difíciles de una manera clara y sencilla."</p>
          <p>- María Gutiérrez</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
