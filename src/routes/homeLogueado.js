import React from 'react'


export const homeLogueado = () => {
  return (
   
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
      <div style={blockStyle}>
        <h2>Mentores</h2>
        <p><div className="col-md-6">
  <div className="card bg-light" style={{ paddingRight: '5px' }}>
    <div className="card-body">
      <h4 className="card-title mb-4">Mentores Recientes</h4>
      <div className="d-flex justify-content-between">
        <img src="../imagen/proyecto.jpg" alt="Proyecto" className="img-fluid rounded-circle mentor-img" />
        <img src="/imagenes/mentor2.jpg" alt="Mentor 2" className="img-fluid rounded-circle mentor-img" />
        <img src="/imagenes/mentor3.jpg" alt="Mentor 3" className="img-fluid rounded-circle mentor-img" />
      </div>
    </div>
  </div>
</div></p>
      </div>
      
      </div>
  );
}
const blockStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  margin: '10px',
};

export default homeLogueado;
