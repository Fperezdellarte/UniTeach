import React from 'react';
import Navbar from '../components/navbar';
import '../styles/about.css'
import aboutImage1 from '../Assest/Juan.jpg'; // Importa la primera imagen
import aboutImage2 from '../Assest/Andres.jpg'; // Importa la segunda imagen
import aboutImage3 from '../Assest/Alvaro.jpg'; // Importa la tercera imagen
import aboutImage4 from '../Assest/Agustina.jpg';
import aboutImage5 from '../Assest/Joaco.jpg';
import aboutImage6 from '../Assest/Fran.jpg';

export const About = () => {
 
  const images = [
    { src: aboutImage1, description: 'Juan Reina, Desarrollador' },
    { src: aboutImage2, description: 'Andres Ramirez, Desarrollador' },
    { src: aboutImage3, description: 'Alvaro Ybañez, Desarrollador' },
    { src: aboutImage4, description: 'Agustina Gauna, Desarrollador' },
    { src: aboutImage5, description: 'Joaquin Asar, Tester' },
    { src: aboutImage6, description: 'Francisco Perez, Scrum Master' }
  ];

  return (
    <div> 
    <Navbar/>    
      <div className='about'>
        <div className="image-grid">
          {/* Mapea sobre la matriz de imágenes y renderiza cada una */}
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.src} alt={`Acerca de Nosotros ${index + 1}`} className="about-image" />
              <p className="image-description">{image.description}</p>
            </div>
          ))}
        </div>
        <h1>Acerca de Nosotros</h1>
        <p>Somos Uniteach, una plataforma creada por estudiantes que conecta a otros estudiantes universitarios para ofrecer y recibir mentorías académicas.</p>
        <p>Nuestra misión es facilitar el intercambio de conocimientos y promover el éxito académico de nuestros usuarios.</p>
        {/* Sección de Contacto (Contact Section) */}
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
