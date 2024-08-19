import React, { useState, useEffect } from 'react';
import '../styles/TablaProximaClase.css'; // Asegúrate de que la ruta sea correcta
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_URL } from '../auth/constans';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
  const year = String(date.getUTCFullYear()).slice(-2); // Obtener los últimos dos dígitos del año
  return `${day}-${month}-${year}`;
};

const storedData = localStorage.getItem('authData');
const parsedData = JSON.parse(storedData);
const token = parsedData.token;
const userId = parsedData.user.idUser;

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
    name: "Hora",
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
    cell: row => <button className="action-button">Darse de baja</button>,
    ignoreRowClick: true,
    allowOverflow: true
  }
];

export const TablaProximaClase = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primero obtenemos las inscripciones del usuario
        const inscriptionsResponse = await axios.get(`${API_URL}/inscription/myinscriptions/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const inscriptions = inscriptionsResponse.data.inscription;
        const classIds = inscriptions.map(inscription => inscription.Classes_idClasses);

        // Luego hacemos una solicitud para cada ID de clase para obtener los detalles
        const classResponses = await Promise.all(classIds.map(id =>
          axios.get(`${API_URL}/classes/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ));

        // Obtenemos los datos necesarios de cada clase y los nombres de materias
        const classesData = await Promise.all(classResponses.map(async response => {
          const classData = response.data.class;

          const subjectResponse = await axios.get(`${API_URL}/subjects/${classData.Subjects_idSubjects}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const subjectName = subjectResponse.data.subject.Name;

          const userResponse = await axios.get(`${API_URL}/users/${classData.Users_idCreator}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const mentorName = userResponse.data.Name;
        
          return {
            Materia: subjectName,
            date: classData.date,
            hour: classData.hour,
            Place: classData.Place,
            Mentor: mentorName,
            idClasses: classData.idClasses
          };
        }));

        // Asignar los datos formateados a la tabla
        setData(classesData);
      } catch (error) {
        setError('No podemos mostrar tus clases');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      {error && <div>{error}</div>}
      <DataTable
        title="Próximas Clases"
        columns={columns}
        data={data}
        noDataComponent="No tienes próximas clases"
        customStyles={{
          rows: {
            style: {
              padding: '12px',
              borderBottom: '1px solid #ddd'
            }
          },
          headCells: {
            style: {
              fontWeight: 'bold',
              textAlign: 'left',
              color: '#000',
              padding: '16px'
            }
          },
          cells: {
            style: {
              padding: '12px'
            }
          },
          pagination: {
            style: {
              backgroundColor: '#f8f8f8',
              padding: '8px',
              borderTop: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'center'
            }
          }
        }}
      />
    </div>
  );
};
