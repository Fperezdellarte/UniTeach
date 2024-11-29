import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
import '../styles/clases.css';
import { Navbar } from '../components/navbar';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { useAuth } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';

const Clases = () => {
  const { classesData, error, loading } = useContext(ClassesContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0); // Estado para la calificación
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    navigate('/login');
  }

  const handleRatingClick = async (star) => {
    try {
      await axios.post(`${API_URL}/users/rating/${classesData.mentorId}`, {
        star,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
    } catch{};
  };
  

console.log(classesData);
  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '30%',
    },
    {
      name: "Fecha y Hora",
      selector: row => row.hour,
      sortable: true,
      width: '35%',
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
      width: '20%',
    },
    {
      name:"Mentor",
      selector: row=> row.Mentor,
      sortable: true,
      width:'30%'
    },
    {
      name: "Acciones",
      width: '15%',
      cell: (row) => (
        <button 
          onClick={handleShowModal}
          className="rate-button"
        >
          Calificar Mentor
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true, 
      button: true,
    }
  ];

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (classesData.recent.length === 0) {
    return <div>No tienes clases disponibles</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="table-container container-recientes">
        <h2 className="table-clases-recientes">Clases Recientes</h2>
        <DataTable
          columns={columns}
          data={classesData.recent}
          noDataComponent="No tienes clases disponibles"
          customStyles={{
            rows: {
              style: {
                padding: '12px',
                borderBottom: '1px solid #ddd',
              },
            },
            headCells: {
              style: {
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#fff',
                color: '#25619c',
                padding: '20px',
                fontSize:'x-large',
              },
            },
            cells: {
              style: {
                padding: '12px',
                fontSize:'large',
                marginLeft: '3px',
                fontWeight: 'bold',
              },
            },
            pagination: {
              style: {
                backgroundColor: '#f8f8f8',
                padding: '12px',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
              },
            },
          }}
        />
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="fullscreen-modal"
        centered
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-content-custom">
          <button className="close-modal-btn" onClick={handleCloseModal}>
            ×
          </button>
          <h2 className="rate-title">Califica al mentor</h2>
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`star-icon ${selectedRating >= star ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedRating(star); // Actualiza el estado de la calificación seleccionada
                  handleRatingClick(star); // Envía la calificación al servidor
                }}
              />
            ))}
          </div>
          <button
            className="submit-rating-btn action-buttom"
            onClick={() => handleCloseModal()}
            disabled={selectedRating === 0} 
          >
            Enviar Calificación
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Clases;
