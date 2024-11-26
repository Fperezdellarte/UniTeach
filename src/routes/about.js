import React from 'react';
import Navbar from '../components/navbar';
import '../styles/about.css';

export const About = () => {
  return (
    <div>
      <Navbar />
      <div className='container-about'>
        <div className='row-content'>
          {/* Sección de "Acerca de Nosotros" */}
          <div className='about'>
            <h1 className='text-black'>Acerca de Nosotros</h1>
            <p className='text-black'>
              Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.
            </p>
            <p className='text-black'>
              Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.
            </p>
          </div>

          {/* Sección de "Contacto" */}
          <div className='contact'>
            <h2 className='text-black'>Contacto</h2>
            <p className='text-black'>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
            <form>
              <input type="text" placeholder="Nombre" className="form-control mb-2" />
              <input type="email" placeholder="Correo Electrónico" className="form-control mb-2" />
              <textarea placeholder="Mensaje" className="form-control mb-2"></textarea>
              <button className="btn btn-primary">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
