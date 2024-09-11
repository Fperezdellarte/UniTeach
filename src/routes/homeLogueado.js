import React from 'react';
import { Navbar } from '../components/navbar';
import '../styles/homeLogueado.css'; 
import proyecto from '../Assest/proyecto.jpg';
import personas from '../Assest/OTRO.jpg';
import pareja from '../Assest/JuanPerez.jpg';
import Maria from '../Assest/Maria.jpg';
import emilia from '../Assest/emilia.jpg';
import carliito from '../Assest/carliito.jpg';
import { TablaProximaClase } from '../components/TablaProximaClase';
import { TablaClasesRecientes } from '../components/TablaClasesRecientes';
import MentorCard from '../components/mentorCard'; // Asegúrate que la ruta sea correcta

export const HomeLogueado = () => {
  // Ejemplo de mentores recientes
  const mentoresRecientes = [
    {
      idUser: 1,
      MentorName: "Carlos Paez",
      Opinion: 4.5,
      SubjectName: "Analisis Matematico 2",
      MentorUniversity: "Nacional de Tucuman",
      profileImageUrl: proyecto,
    },
    {
      idUser: 2,
      MentorName: "Lisandro Lopez",
      Opinion: 4.0,
      SubjectName: "Algoritmo y Paradigma",
      MentorUniversity: "Santo Tomas de Aquino",
      profileImageUrl: pareja,
    },
    {
      idUser: 3,
      MentorName: "Diego Lopez",
      Opinion: 5.0,
      SubjectName: "Fisica 3",
      MentorUniversity: "Tecnologica de Tucuman",
      profileImageUrl: personas,
    },{
      idUser: 4,
      MentorName: "Gustavo Ibañez",
      Opinion: 5.0,
      SubjectName: "Matematica 3",
      MentorUniversity: "Nacional de Tucuman",
      profileImageUrl: carliito,
    },
    {
      idUser: 5,
      MentorName: "Martina Sandoval",
      Opinion: 3.5,
      SubjectName: "Humanistica",
      MentorUniversity: "Santo Tomas de Aquino",
      profileImageUrl: emilia,
    },
    {
      idUser: 6,
      MentorName: "Emilia Mernes",
      Opinion: 4.0,
      SubjectName: "Ingles C1",
      MentorUniversity: "Tecnologica de Tucuman",
      profileImageUrl: Maria,
    },
  ];

  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <TablaClasesRecientes/>
          </div>
          <div className="col-md-8">
            <TablaProximaClase/>
          </div>
        </div>
        <div style={blockStyle}>
          <h2 className='MentoresRecientes'>Mentores recientes</h2>
          <div className="row">
            {mentoresRecientes.map((mentor) => (
              <div className="col-md-4" key={mentor.idUser}>
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const blockStyle = {
  border: '1px solid #ccc',
  padding: '2em',
  margin: '2em',
};

export default HomeLogueado;
