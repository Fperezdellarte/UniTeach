import React from 'react';
import './MarqueeCarousel.css';

// Datos de ejemplo para las tarjetas
const reviews = [
  { img: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg", name: "Carlos Perez", username: "@charlyP", body: "Increíble experiencia, el mejor sitio para aprender." },

  { img: "https://avatar.vercel.sh/jill", name: "Mario Bravo", username: "@maritoBa", body: "Una herramienta valiosa para todos los estudiantes." },

  { img: "https://covalto.com/static/78498ccda70933a5f1e3edc3e40d3cbe/34aca/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp", name: "Lucas Martinez", username: "@Lucas20", body: "Los mentores son amables y accesibles." },

  { img: "https://avatar.vercel.sh/jane", name: "Adrian Martinez", username: "@AMartinez", body: "La plataforma me ayudó a mejorar mis habilidades rápidamente." },

  { img: "https://avatar.vercel.sh/jenny", name: "Luciano Paez", username: "@Lucho", body: "Excelente para conectarse con profesores y compañeros." },
 
  { img: "https://avatar.vercel.sh/james", name: "James", username: "@james", body: "Muy fácil de usar y con muchos recursos disponibles." },
  
  { img: "https://www.shutterstock.com/image-photo/happy-pretty-gen-z-latin-260nw-2438190523.jpg", name: "Anna", username: "@anna", body: "Un gran lugar para aprender y crecer en mi carrera." },
  
  { img: "https://avatar.vercel.sh/mike", name: "Mike", username: "@mike", body: "Recomiendo esta plataforma a todos mis amigos y colegas." },
  
  { img: "https://avatar.vercel.sh/sarah", name: "Sarah", username: "@sarah", body: "Los recursos son útiles y el soporte es excepcional." },
  
  { img: "https://avatar.vercel.sh/leo", name: "Leo", username: "@leo", body: "Una gran inversión para mi educación y desarrollo personal." }
];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <div className="marquee-card">
      <img src={img} alt={name} width="80" height="80" />
      <h4>{name}</h4>
      <p>{body}</p>
    </div>
  );
};

const MarqueeCarousel = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="marquee-container">
      <div className="marquee-row">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </div>
      <div className="marquee-row">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </div>
      <div className="marquee-gradient marquee-gradient-left"></div>
      <div className="marquee-gradient marquee-gradient-right"></div>
    </div>
  );
};

export default MarqueeCarousel;
