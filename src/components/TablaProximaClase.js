import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext'; // Asegúrate de importar correctamente
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';
import { useAuth } from '../auth/authProvider'; // Importar el hook useAuth
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import '../styles/TablaProximaClase.css';

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

  return (
    <div className="table-container">
      <h2 className="table-title">Próximas Clases</h2>
      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : isAuthenticated ? (
        <DataTable className='mb-3'
          columns={columns}
          data={classesData.upcoming}
          noDataComponent="No tienes próximas clases"
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
    
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};
