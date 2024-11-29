import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext';
import '../styles/clases.css';
import { Navbar } from '../components/navbar';

const Clases = () => {
  const { classesData, error, loading } = useContext(ClassesContext);

  console.log(classesData);
  const handleRateClass = (classData) => {
  
    
  };

  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '30%'
    },
    {
      name: "Fecha y Hora",
      selector: row => row.hour,
      sortable: true,
      width: '35%'
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
      width: '20%'
    },
    {
      name: "Acciones",
      width: '15%',
      cell: (row) => (
        <button 
          onClick={() => handleRateClass(row)} 
          className="rate-button"
        >
          Calificar
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

  // Verificar si los datos recientes están vacíos
  if (classesData.recent.length === 0) {
    return <div>No tienes clases disponibles</div>;
  }

  return (
    <div className=''>
      <Navbar/>
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
    </div>
  );
};

export default Clases;
