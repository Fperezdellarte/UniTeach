import React, { useState } from 'react';
import { Navbar } from '../components/navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/homeLogueado.css'; 
import proyecto from '../Assest/proyecto.jpg';
import personas from '../Assest/personas.jpg';
import pareja from '../Assest/pareja.jpg';

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
                <h4 className="card-title mb-4">Turnos</h4>
                <div className="card-text">
                  <p><strong>Algebra:</strong> Lunes y Miércoles: 10:00 - 12:00</p>
                  <p><strong>Algoritmo:</strong> Martes y Jueves: 14:00 - 16:00</p>
                </div>
                <button className="btn btn-primary mt-3">Ver más</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <h4 className="card-title mb-4">Clases Recientes</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Materia</th>
                      <th>Hora</th>
                      <th>Mentor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Algebra</td>
                      <td>10:00 - 12:00</td>
                      <td>Profesor 1</td>
                    </tr>
                    <tr>
                      <td>Algoritmo</td>
                      <td>14:00 - 16:00</td>
                      <td>Profesor 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
