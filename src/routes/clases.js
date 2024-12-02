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

<<<<<<< HEAD
<<<<<<< develop
  console.log(classesData);
  const handleRateClass = (classData) => {
  
    
=======
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
    console.log(star);
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/users/rating/${mentorId}`, // Usa mentorId en la URL
        { rate: star },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Calificación enviada: ${star} estrellas para mentor ${mentorId}`);
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> local
  };
=======
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0); // Estado para la calificación
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94

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
<<<<<<< HEAD
<<<<<<< develop
      width: '30%'
=======
      width: '20%',
>>>>>>> local
=======
      width: '30%',
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
    },
    {
      name: "Fecha y Hora",
      selector: row => row.hour,
      sortable: true,
<<<<<<< HEAD
<<<<<<< develop
      width: '35%'
=======
      width: '25%',
>>>>>>> local
=======
      width: '35%',
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
<<<<<<< HEAD
<<<<<<< develop
      width: '20%'
=======
      width: '15%',
=======
      width: '20%',
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
    },
    {
      name:"Mentor",
      selector: row=> row.Mentor,
      sortable: true,
<<<<<<< HEAD
      width:'15%'
>>>>>>> local
=======
      width:'30%'
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
    },
    {
      name: "Acciones",
      width: '20%',
      sortable: true,
      cell: (row) => (
        <button 
<<<<<<< HEAD
<<<<<<< develop
          onClick={() => handleRateClass(row)} 
=======
          onClick={() => {
            setSelectedId(row.mentorId); 
            handleShowModal(); 
          }}
>>>>>>> local
=======
          onClick={handleShowModal}
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
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
<<<<<<< HEAD
<<<<<<< develop
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
=======
            pagination: {
              style: {
                padding: '12px',
                display: 'flex',
                justifyContent: 'center',
              },
            },
=======
            pagination: {
              style: {
                backgroundColor: '#f8f8f8',
                padding: '12px',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
              },
            },
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
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
<<<<<<< HEAD
                  setSelectedRating(star);
=======
                  setSelectedRating(star); // Actualiza el estado de la calificación seleccionada
                  handleRatingClick(star); // Envía la calificación al servidor
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
                }}
              />
            ))}
          </div>
          <button
            className="submit-rating-btn action-buttom"
<<<<<<< HEAD
            onClick={async () => {
              try {
                await handleRatingClick(selectedRating, selectedId); // Pasa el mentorId
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
>>>>>>> local
=======
            onClick={() => handleCloseModal()}
            disabled={selectedRating === 0} 
          >
            Enviar Calificación
          </button>
        </div>
      </Modal>
>>>>>>> ec3bf964c1dfbaeeb1c774c0668fb29ac653ad94
    </div>
  );
};

export default Clases;
