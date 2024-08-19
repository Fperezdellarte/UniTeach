import React, { useState, useEffect } from 'react';
import '../styles/TablaProximaClase.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const storedData = localStorage.getItem('authData');
let parsedData = null;
let token = null;
let userId = null;

if (storedData) {
  parsedData = JSON.parse(storedData);
  token = parsedData?.token || '';
  userId = parsedData?.user?.idUser || null;
}

if (!parsedData || !userId || !token) {
  console.error('No se encontraron datos de autenticación.');
  // Puedes redirigir al usuario a la página de login o mostrar un mensaje de error.
}



export const TablaProximaClase = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las inscripciones del usuario
        const inscriptionsResponse = await axios.get(`${API_URL}/inscription/myinscriptions/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
  
        const inscriptions = inscriptionsResponse.data.inscription;
  
        // Obtener detalles de cada clase
        const classesData = await Promise.all(inscriptions.map(async (inscription) => {
          const classResponse = await axios.get(`${API_URL}/classes/${inscription.Classes_idClasses}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const classData = classResponse.data.class;
  
          const subjectResponse = await axios.get(`${API_URL}/subjects/${classData.Subjects_idSubjects}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const subjectName = subjectResponse.data.subject.Name;
  
          const userResponse = await axios.get(`${API_URL}/users/${classData.Users_idCreator}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const mentorName = userResponse.data.Name;
  
          return {
            idInscription: inscriptions.find(inscription => inscription.Classes_idClasses === classData.idClasses).idInscription,
            Materia: subjectName,
            date: classData.date,
            hour: classData.hour,
            Place: classData.Place,
            Mentor: mentorName,
            idClasses: classData.idClasses
          };
        }));
  
        // Filtrar clases que ya pasaron
        const currentDate = new Date();
        const upcomingClasses = classesData.filter(classItem => {
          const classDate = new Date(classItem.date);
          return classDate >= currentDate;
        });
  
        setData(upcomingClasses);
      } catch (error) {
        setError('No podemos mostrar tus clases');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Terminar la carga
      }
    };
  
    fetchData();
  }, []);

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
      setData(prevData => prevData.filter(item => item.idInscription !== selectedId));
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
      selector: row => row.Mentor,
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
      ) : (
        <DataTable
          columns={columns}
          data={data}
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
      
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
  
};