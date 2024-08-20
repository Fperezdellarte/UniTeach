import React from 'react';
import { Navbar } from '../components/navbar';
import '../styles/homeLogueado.css'; 
import proyecto from '../Assest/proyecto.jpg';
import personas from '../Assest/personas.jpg';
import pareja from '../Assest/pareja.jpg';
import { TablaProximaClase } from '../components/TablaProximaClase';
import { TablaClasesRecientes } from '../components/TablaClasesRecientes';



export const HomeLogueado = () => {
 

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
  );
}

const blockStyle = {
  border: '1px solid #ccc',
  padding: '2em',
  margin: '2em',
};

export default HomeLogueado;
