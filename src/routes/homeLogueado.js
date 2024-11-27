import React from 'react';
import { Navbar } from '../components/navbar';
import '../styles/homeLogueado.css'; 
import proyecto from '../Assest/proyecto.jpg';
import personas from '../Assest/OTRO.jpg';
import pareja from '../Assest/JuanPerez.jpg';
import { TablaProximaClase } from '../components/TablaProximaClase';
import { TablaClasesRecientes } from '../components/TablaClasesRecientes';
import MentorCard from '../components/mentorCard';
import { useNavigate } from 'react-router-dom';

export const HomeLogueado = () => {
  const navigate = useNavigate();

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
    },
  ];

   return (
   
   <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <TablaClasesRecientes/>
          </div>
          <div className="col-md-8">
            <TablaProximaClase/>
          </div>
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
  );
}

const blockStyle = {
  border: '1px #ccc',
  margin: '2em',
};

export default HomeLogueado;
