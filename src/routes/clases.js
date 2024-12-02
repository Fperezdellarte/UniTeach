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
  const [selectedRating, setSelectedRating] = useState(0); 
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);


  if (!isAuthenticated) {
    navigate('/login');
  }

  const handleRatingClick = async (star, mentorId) => {
    try {
      await axios.post(`${API_URL}/users/rating/${selectedId}`, {
        "rate": star,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      console.log(`Calificación enviada: ${star} estrellas para mentor ${selectedId}`);
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '20%',
    },
    {
      name: "Fecha y Hora",
      selector: row => row.hour,
      sortable: true,
      width: '25%',
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
      width: '15%',
    },
    {
      name:"Mentor",
      selector: row=> row.Mentor,
      sortable: true,
      width:'20%'
    },
    {
      name: "Acciones",
      width: '20%',
      sortable: true,
      cell: (row) => (
        <button 
          onClick={() => {
            setSelectedId(row.mentorId); 
            handleShowModal(); 
          }}
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
                borderBottom: '1px solid #ddd', // Línea divisoria para todas las filas
              },
            },
            headCells: {
              style: {
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: '#fff',
                color: '#25619c',
                padding: '20px',
                fontSize: 'x-large',
              },
            },
            cells: {
              style: {
                padding: '12px',
                fontSize: 'large',
                fontWeight: 'bold',
              },
            },
            pagination: {
              style: {
                padding: '12px',
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
                  setSelectedRating(star); 
                }}
              />
            ))}
          </div>
          <button
            className="submit-rating-btn action-buttom"
            onClick={async () => {
              try {
                await handleRatingClick(selectedRating, selectedId);
                handleCloseModal(); 
              } catch (error) {
                console.error("Error al enviar la calificación", error);
              }
            }}
            disabled={selectedRating === 0 || isLoading} 
          >
            {isLoading ? <span className="spinner-border spinner-border-sm" /> : "Enviar Calificación"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Clases;
