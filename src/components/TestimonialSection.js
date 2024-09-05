import React from 'react';
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
];

const TestimonialSection = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-black mb-4">Testimonios de Usuarios</h2>
      <div className="row">
        {reviews.map((review, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={index}>
            <ReviewCard {...review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
