import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export const ModalProxClases = () => { // Cambiado a mayúscula inicial
    
  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  const navigate = useNavigate();

  const handleModalClick = (subject) => {
    navigate('/Results', { state: { subjectName: subject } });
  };

  return (
    <div>
      <Button
        className="blue-button mb-4"
        onClick={handleShowModal}
      >
        Empieza Ahora
      </Button>

      {/* Modals Section */}
      <div className="modal-section">
        <div className="modal-card" onClick={() => handleModalClick('Ingeniería')}>
          <div 
            className="modal-background" 
            style={{ backgroundImage: 'url(https://images.griddo.universitatcarlemany.com/c/cover/q/95/w/828/h/468/p/center/f/avif/el-dibujo-tecnico-y-su-papel-en-la-ingenieria)' }}
          >
            <div className="hover-text">
              <p>Facultad de Ingeniería</p>
              <p>Haz clic para ingresar y encontrar tu mentor</p>
            </div>
          </div>
        </div>
        
        <div className="modal-card" onClick={() => handleModalClick('Medicina')}>
          <div 
            className="modal-background" 
            style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKewYg7Q29s9pqDuj_2_qRmN45zq2uXMHgww&s)' }}
          >
            <div className="hover-text">
              <p>Facultad de Medicina</p>
              <p>Haz clic para ingresar y encontrar tu mentor</p>
            </div>
          </div>
        </div>
        
        <div className="modal-card" onClick={() => handleModalClick('Psicología')}>
          <div 
            className="modal-background" 
            style={{ backgroundImage: 'url(https://un.edu.mx/wp-content/uploads/2023/02/Universidad-del-Norte-Perspectivas-laborales-subtitulo-2.png)' }}
          >
            <div className="hover-text">
              <p>Facultad de Psicología</p>
              <p>Haz clic para ingresar y encontrar tu mentor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
