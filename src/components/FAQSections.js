import React, { useState } from 'react';
import '../styles/faqSection.css';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">¿Tienes Preguntas?</h2>
      <p className="faq-subtitle">Algunas preguntas frecuentes</p>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {item.question}
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

const faqData = [
  { question: '¿Qué puedo crear con Uniteach?', answer: 'Puedes conectarte con mentores, agendar clases y acceder a materiales educativos de varias universidades en Tucumán.' },
  { question: '¿Cuánto cuesta?', answer: 'Uniteach es gratuito para estudiantes y mentores.' },
  { question: '¿Qué idiomas soporta?', answer: 'Actualmente, Uniteach soporta español e inglés.' },
  { question: '¿Puedo obtener una demostración del producto?', answer: 'Sí, puedes solicitar una demostración contactando a nuestro equipo de soporte.' },
  { question: '¿Dónde puedo aprender más sobre Uniteach?', answer: 'Puedes obtener más información visitando la página Acerca de en nuestro sitio web.' }
];

export default FAQSection;
