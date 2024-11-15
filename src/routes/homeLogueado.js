import React, { useState } from 'react';
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
import MentorCard from '../components/mentorCard';
import { useNavigate } from 'react-router-dom';

export const HomeLogueado = () => {
  const [modalVisible, setModalVisible] = useState(null);
  const navigate = useNavigate();

  const handleModalClick = (subject) => {
    navigate('/Results', { state: { subjectName: subject } });
  };

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
    {
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
      <Navbar />
      <div className="container">
        {/* Modals Section */}
        <div className="modal-section">
          <div className="modal-card" onClick={() => handleModalClick('Ingeniería')}>
            <div className="modal-background" style={{ backgroundImage: 'url(https://images.griddo.universitatcarlemany.com/c/cover/q/95/w/828/h/468/p/center/f/avif/el-dibujo-tecnico-y-su-papel-en-la-ingenieria)' }}>
              <div className="hover-text">
                <p>Facultad de Ingeniería</p>
                <p>Haz clic para ingresar y encontrar tu mentor</p>
              </div>
            </div>
          </div>
          <div className="modal-card" onClick={() => handleModalClick('Medicina')}>
            <div className="modal-background" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKewYg7Q29s9pqDuj_2_qRmN45zq2uXMHgww&s)' }}>
      
              <div className="hover-text">
                <p>Facultad de Medicina</p>
                <p>Haz clic para ingresar y encontrar tu mentor</p>
              </div>
            </div>
          </div>
          <div className="modal-card" onClick={() => handleModalClick('Psicología')}>
            <div className="modal-background" style={{ backgroundImage: 'url(https://un.edu.mx/wp-content/uploads/2023/02/Universidad-del-Norte-Perspectivas-laborales-subtitulo-2.png)' }}>
           
              <div className="hover-text">
                <p>Facultad de Psicología</p>
                <p>Haz clic para ingresar y encontrar tu mentor</p>
              </div>
            </div>
          </div>
        </div>
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
          <div className="col-md-6">
            <div className="card-bg-light2">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <img src={proyecto} alt="Proyecto" className="img-fluid rounded-circle mentor-img" />
                  <img src={pareja} alt="Mentor 2" className="img-fluid rounded-circle mentor-img" />
                  <img src={personas} alt="Mentor 3" className="img-fluid rounded-circle mentor-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Mentores Recientes Section */}
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
  border: '1px #ccc',
  margin: '2em',
};

export default HomeLogueado;
