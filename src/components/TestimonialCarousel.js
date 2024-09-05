import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReviewCard from './ReviewCard'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const reviews = [
  {
    name: "Juan Pérez",
    username: "@juanperez",
    body: "Gracias a Uniteach, he mejorado mis habilidades en matemáticas y ahora estoy más confiado para mis exámenes.",
    img: "https://avatar.vercel.sh/juanperez",
  },
  {
    name: "María Gutiérrez",
    username: "@mariag",
    body: "Encontré a un excelente mentor de programación que me ayudó a entender conceptos difíciles de una manera clara y sencilla.",
    img: "https://avatar.vercel.sh/mariag",
  },
  {
    name: "Carlos Paez",
    username: "@carlosp",
    body: "Una de las mejores herramientas para el aprendizaje de manera versátil.",
    img: "https://avatar.vercel.sh/carlosp",
  },
  // Nuevas cartas de testimonios
  {
    name: "Lucía Fernández",
    username: "@luciaf",
    body: "La plataforma de Uniteach me permitió organizar mejor mi tiempo y aprovechar al máximo cada sesión de estudio.",
    img: "https://avatar.vercel.sh/luciaf",
  },
  {
    name: "Miguel Angel",
    username: "@miguelangel",
    body: "He podido conectar con mentores que realmente entienden mis necesidades y me han ayudado a superar mis desafíos académicos.",
    img: "https://avatar.vercel.sh/miguelangel",
  },
  {
    name: "Ana María",
    username: "@anamaria",
    body: "Gracias a Uniteach, ahora tengo acceso a recursos educativos de alta calidad y mentores que me inspiran a aprender más.",
    img: "https://avatar.vercel.sh/anamaria",
  },
  {
    name: "Pedro Sánchez",
    username: "@pedrosanchez",
    body: "Uniteach ha cambiado la forma en que estudio. Los recursos y mentores son excepcionales.",
    img: "https://avatar.vercel.sh/pedrosanchez",
  },
  {
    name: "Laura Méndez",
    username: "@lauramendez",
    body: "Una herramienta fantástica para estudiantes que buscan mejorar en sus materias favoritas.",
    img: "https://avatar.vercel.sh/lauramendez",
  },
  {
    name: "Luis Rodríguez",
    username: "@luisrodriguez",
    body: "La plataforma es muy intuitiva y facilita el aprendizaje de manera efectiva.",
    img: "https://avatar.vercel.sh/luisrodriguez",
  },
  {
    name: "Sofía Torres",
    username: "@sofiatorres",
    body: "Los mentores de Uniteach son muy profesionales y siempre están dispuestos a ayudar.",
    img: "https://avatar.vercel.sh/sofiatorres",
  },
  {
    name: "Andrés Gómez",
    username: "@andresgomez",
    body: "He mejorado significativamente en mis estudios gracias a Uniteach.",
    img: "https://avatar.vercel.sh/andresgomez",
  },
];

const TestimonialCarousel = () => {
  return (
    <Carousel interval={5000} pauseOnHover={true}>
      {reviews.map((review, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center">
            <ReviewCard {...review} />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialCarousel;
