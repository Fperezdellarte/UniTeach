import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../auth/constans';
import { useAuth } from '../auth/authProvider';

export const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {
  const [classesData, setClassesData] = useState({
    upcoming: [],
    recent: []
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);  // Comienza la carga
      try {
        const inscriptionsResponse = await axios.get(`${API_URL}/inscription/myinscriptions/${user.idUser}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const inscriptions = inscriptionsResponse.data.inscription;

        const classesData = await Promise.all(inscriptions.map(async (inscription) => {
          const classResponse = await axios.get(`${API_URL}/classes/${inscription.Classes_idClasses}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const classData = classResponse.data.class;

          const mentorResponse = await axios.get(`${API_URL}/users/mentor/${classData.Users_idCreator}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const mentorName = mentorResponse.data.Name;
          const mentorId = mentorResponse.data.idUser;

          const subjectResponse = await axios.get(`${API_URL}/subjects/${classData.Subjects_idSubjects}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const subjectName = subjectResponse.data.subject.Name;

          return {
            idInscription: inscriptions.find(inscription => inscription.Classes_idClasses === classData.idClasses).idInscription,
            Materia: subjectName,
            Mentor:mentorName,
            MentorId: mentorId,
            date: classData.Date,
            endDate: classData.endDate,  // Asegúrate de que endDate esté disponible
            hour: classData.hour,
            Place: classData.Place,
            idClasses: classData.idClasses
          };
        }));

        const currentDate = new Date();
        const upcomingClasses = classesData.filter(classItem => new Date(classItem.endDate) >= currentDate);
        const pastClasses = classesData.filter(classItem => new Date(classItem.endDate) < currentDate);

        const sortedClasses = pastClasses.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
        const latestThreeClasses = sortedClasses.slice(0, 3);

        setClassesData({
          upcoming: upcomingClasses,
          recent: latestThreeClasses
        });
      } catch (error) {
        setError('No podemos mostrar tus clases');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // Termina la carga
      }
    };

    fetchData();
  }, [user, token]);

  return (
    <ClassesContext.Provider value={{ classesData, error, loading }}>
      {children}
    </ClassesContext.Provider>
  );
};
