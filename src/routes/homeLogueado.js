import React, { useState } from 'react';
import { Navbar } from '../components/navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/homeLogueado.css'; 
import proyecto from '../Assest/proyecto.jpg';
import personas from '../Assest/personas.jpg';
import pareja from '../Assest/pareja.jpg';
import { TablaProximaClase } from '../components/TablaProximaClase';

export const HomeLogueado = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Usuario ha cerrado sesión');
  }

  return (
    <div>
      <Navbar onLogout={handleLogout}/>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <h4 className="card-title mb-4">clases recientes</h4>
                <div className="card-text">
                  <p><strong>Algebra:</strong> Lunes : 10:00</p>
                  <p><strong>Algoritmo:</strong> Jueves: 14:00 </p>
                </div>
                <button className="btn btn-primary mt-3">Ver más</button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <TablaProximaClase/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-light">
              <div className="card-body">
                <h4 className="card-title mb-4">Selecciona una Fecha</h4>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
            </div>
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
