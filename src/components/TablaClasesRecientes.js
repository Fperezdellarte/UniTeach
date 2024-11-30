import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
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
  console.log("Datos recibidos del contexto en tabla clases recientes", classesData);
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
        <button className="blue-button">Ver Más</button>
      </div>
    </div>
  );
};
