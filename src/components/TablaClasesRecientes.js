import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
import { Modal, Button } from 'react-bootstrap'; 
import '../styles/TablaClasesRecientes.css';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const formatDateTime = (date, hour) => {
  const formattedDate = formatDate(date);
  return `${formattedDate} ${hour}`;
};

export const TablaClasesRecientes = () => {
  const { classesData, error, loading } = useContext(ClassesContext);
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '25%'
    },
    {
      name: "Fecha y Hora",
      selector: row => formatDateTime(row.date, row.hour),
      sortable: true,
      width: '45%'
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
      width: '20%'
    }
  ];

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleViewMoreClick = () => {
    if (classesData.recent.length === 0) {
      handleShowModal();
    } else {
      
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Clases Recientes</h2>
      <DataTable
        columns={columns}
        data={classesData.recent}
        noDataComponent="No tienes clases recientes"
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
              padding: '12px',
              borderTop: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'center',
            },
          },
        }}
      />
      <div className="button-container">
        <button className="blue-button mb-2" onClick={handleViewMoreClick}>Ver Más</button>
      </div>

      {/* Modal */}
      <Modal className='modal-clases'  show={showModal}
        onHide={handleCloseModal}
        animation={true}
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title>No hay clases recientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vuelva mas tarde.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
