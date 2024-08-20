import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ClassesContext } from '../contexts/classesContext'; // Asegúrate de importar correctamente
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

  const columns = [
    {
      name: "Materia",
      selector: row => row.Materia,
      sortable: true,
      width: '25%' // Ajusta el ancho de la columna según sea necesario
    },
    {
      name: "Fecha y Hora",
      selector: row => formatDateTime(row.date, row.hour),
      sortable: true,
      width: '45%' // Ajusta el ancho de la columna según sea necesario
    },
    {
      name: "Aula",
      selector: row => row.Place,
      sortable: true,
      width: '20%' // Ajusta el ancho de la columna según sea necesario
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
              padding: '12px', // Restaura el padding para aumentar el tamaño de la tabla
              borderBottom: '1px solid #ddd',
            },
          },
          headCells: {
            style: {
              fontWeight: 'bold',
              textAlign: 'left',
              backgroundColor: '#fff',
              color: '#000',
              padding: '16px', // Restaura el padding en los encabezados
            },
          },
          cells: {
            style: {
              padding: '12px', // Restaura el padding en las celdas
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
