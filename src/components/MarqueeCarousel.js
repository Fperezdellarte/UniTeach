import React from 'react';
import '../styles/MarqueeCarousel.css';

// Datos de ejemplo para las tarjetas
const reviews = [
  { img: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg", name: "Carlos Perez", username: "@charlyP", body: "Increíble experiencia, el mejor sitio para aprender." },

  { img: "https://st5.depositphotos.com/16122460/73816/i/450/depositphotos_738168820-stock-photo-portrait-handsome-young-man-light.jpg", name: "Mario Bravo", username: "@maritoBa", body: "Una herramienta valiosa para todos los estudiantes." },

  { img: "https://covalto.com/static/78498ccda70933a5f1e3edc3e40d3cbe/34aca/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp", name: "Lucas Martinez", username: "@Lucas20", body: "Los mentores son amables y accesibles." },

  { img: "https://st3.depositphotos.com/1177973/15944/i/450/depositphotos_159442188-stock-photo-serious-teenager-in-formal-clothes.jpg", name: "Adrian Martinez", username: "@AMartinez", body: "La plataforma me ayudó a mejorar mis habilidades rápidamente." },

  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMw2Nza5u7QQ0izu2QwGPvShXvXTxBSL72Ow&s", name: "Luciano Paez", username: "@Lucho", body: "Excelente para conectarse con profesores y compañeros." },
 
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmxnuth8qXUGpsAMEba4bWPWfx_hCgXiYIppwSRUv9SA1P554B79vxHi3GOGoJOu_2jA&usqp=CAU", name: "James", username: "@james", body: "Muy fácil de usar y con muchos recursos disponibles." },
  
  { img: "https://www.shutterstock.com/image-photo/happy-pretty-gen-z-latin-260nw-2438190523.jpg", name: "Anna", username: "@anna", body: "Un gran lugar para aprender y crecer en mi carrera." },
  
  { img: "https://www.healthychildren.org/SiteCollectionImagesArticleImages/Kagan_Benjamin_TeentoTeen1.jpg", name: "Mike", username: "@mike", body: "Recomiendo esta plataforma a todos mis amigos y colegas." },
  
  { img: "https://eldiariodelaeducacion.com/wp-content/uploads/2024/08/maria-rodriguez.jpg", name: "Sarah", username: "@sarah", body: "Los recursos son útiles y el soporte es excepcional." },
  
  { img: "https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tYnJlJTIwam92ZW58ZW58MHx8MHx8fDA%3D", name: "Leo", username: "@leo", body: "Una gran inversión para mi educación y desarrollo personal." }
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
