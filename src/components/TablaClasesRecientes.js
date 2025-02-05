import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
import { Modal, Button } from 'react-bootstrap'; 
import '../styles/TablaClasesRecientes.css';
import { Link } from 'react-router-dom';

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
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

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
      setShowModal(true);
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Clases Recientes</h2>

      {classesData.recent.length === 0 ? (
        <div className="no-clases">No hay clases recientes</div>
      ) : (
        <DataTable
          columns={columns}
          data={classesData.recent}
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
      )}

      <div className="button-container">
      {classesData.recent.length === 0 && (
        <Button className="blue-button mb-4" onClick={handleViewMoreClick}>
          Ver mas
        </Button>
      )}
      {classesData.recent.length !== 0 && (
        <Button as={Link}
        to="/clases"
        className="blue-button mb-4"
        onClick={handleViewMoreClick}
      >Ver mas
        </Button>
      )}
      </div>

      {/* Modal */}
      <Modal className='modal-clases' show={showModal}
        onHide={handleCloseModal}
        animation={true}
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title>No hay clases recientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vuelva más tarde.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
