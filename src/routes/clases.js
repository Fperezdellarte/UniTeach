import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
import '../styles/TablaClasesRecientes.css';

const Clases = () => {
  const { classesData, error, loading } = useContext(ClassesContext);

  console.log(classesData);

  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '25%'
    },
    {
      name: "Fecha y Hora",
      selector: row => row.hour,
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

  // Verificar si los datos recientes están vacíos
  if (classesData.recent.length === 0) {
    return <div>No tienes clases disponibles</div>;
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Clases</h2>
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
    </div>
  );
};

export default Clases;
