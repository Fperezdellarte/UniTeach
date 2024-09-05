import React from 'react';
import Navbar from '../components/navbar';
import '../styles/about.css';

export const About = () => {
  return (
    <div> 
      <Navbar/>    
      <div className='about'>
        <h1>Acerca de Nosotros</h1>
        <p>Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.</p>
        <p>Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.</p>

        {/* Sección de Contacto */}
        <section className="contact-section">
          <h2>Contacto</h2>
          <p>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Correo Electrónico" />
            <textarea placeholder="Mensaje"></textarea>
            <button>Enviar Mensaje</button>
          </form>
        </section>
        
      </div>
    </div>
  );
};

export default About;
