import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext'; // Asegúrate de importar correctamente
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';
import { useAuth } from '../auth/authProvider'; // Importar el hook useAuth
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import '../styles/TablaProximaClase.css';
import { Modal} from 'react-bootstrap';
import { useBuscador } from './buscador';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

export const TablaProximaClase = () => {
  const { classesData, error, loading } = useContext(ClassesContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { searchFacultad, handleSearch } = useBuscador();
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
 
  const handleModalClick = (subject) => {
    const searchFacultad = subject
    handleSearch(searchFacultad);
  };
  
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  const handleOpenDialog = (idInscription) => {
    setSelectedId(idInscription);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.delete(`${API_URL}/inscription/${selectedId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSnackbarMessage('Te has dado de baja de la clase correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error al darse de baja');
      setSnackbarOpen(true);
      console.error('Error deleting inscription:', error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true
    },
    {
      name: "Fecha",
      selector: row => formatDate(`${row.date}`),
      sortable: true
    },
    {
      name:"Hora",
      selector: row => `${row.hour}`,
      sortable: true
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true
    },
    {
      name: "Mentor",
      selector: row => row.Mentor|| "Sin Mentor",
      sortable: true
    },
    {
      name: "Acciones",
      cell: row => (
        <button 
          className="action-button" 
          onClick={() => handleOpenDialog(row.idInscription)}
        >
          Darse de baja
        </button>
      ),
      ignoreRowClick: true
    }
  ];
  if (loading || !classesData.upcoming.length) {
  }

  return (
    <div className="table-container">
      <div>
      <h2 className="table-title">Próximas Clases</h2>
      {loading ? (
        <div className="loading-spinner">Cargando...</div>

      ) : isAuthenticated ? (
        <DataTable
        columns={columns}
  data={classesData.upcoming}
  noDataComponent={classesData.upcoming.length === 0 && (
    <div>
      <button
        className="blue-button mb-4" onClick={handleShowModal}>
        Empieza Ahora
      </button>
    </div>
        )}
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
                textAlign: 'left',
                backgroundColor: '#fff',
                color: '#000',
                padding: '16px',
              },
            },
            cells: {
              style: {
                padding: '12px',
              },
            },
            pagination: {
              style: {
                backgroundColor: '#f8f8f8',
                padding: '8px',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
              },
            },
          }}
          />
        ) : (
          <div>Por favor, inicia sesión para ver tus próximas clases.</div>
        )}
      {error && <div>{error}</div>}
        {/* Dialogo de confirmación */}
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        >
        <DialogTitle>Confirmar Baja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas darte de baja de esta clase?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUnsubscribe} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      
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
          <div className="modal-options">
            <div
              className="modal-card fade-in delay-1"
              onClick={() => handleModalClick('Ingeniería')}
            >
              <div
                className="modal-background"
                style={{
                  backgroundImage: 'url(https://images.griddo.universitatcarlemany.com/c/cover/q/95/w/828/h/468/p/center/f/avif/el-dibujo-tecnico-y-su-papel-en-la-ingenieria)',
                }}
              ></div>
              <div className="option-text">Facultad de Ingeniería</div>
            </div>

            <div
              className="modal-card fade-in delay-2"
              onClick={() => handleModalClick('Ciencias de la salud')}
            >
              <div
                className="modal-background"
                style={{
                  backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKewYg7Q29s9pqDuj_2_qRmN45zq2uXMHgww&s)',
                }}
              ></div>
              <div className="option-text">Facultad de Medicina</div>
            </div>

            <div
              className="modal-card fade-in delay-3"
              onClick={() => handleModalClick('Humanidades')}
            >
              <div
                className="modal-background"
                style={{
                  backgroundImage: 'url(https://un.edu.mx/wp-content/uploads/2023/02/Universidad-del-Norte-Perspectivas-laborales-subtitulo-2.png)',
                }}
              ></div>
              <div className="option-text">Facultad de Psicología</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
