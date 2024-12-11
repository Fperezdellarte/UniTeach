import React from 'react';
import { Navbar } from '../components/navbar';
import '../styles/homeLogueado.css'; 
import { TablaProximaClase } from '../components/TablaProximaClase';
import { TablaClasesRecientes } from '../components/TablaClasesRecientes';
import { Mentores } from '../components/MentoresRecientes';

export const HomeLogueado = () => {
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
          <Mentores/>
        </div>
      </div>
  );
}

const blockStyle = {
  border: '1px #ccc',
  margin: '2em',
};

export default HomeLogueado;
