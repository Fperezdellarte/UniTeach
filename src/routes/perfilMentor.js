import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PerfilMentor.css'; // Ajusta la ruta según tu estructura de archivos
import { API_URL } from '../auth/constans';


const PerfilMentor = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const { searchTerm, setSearchTerm } = useBuscador();

  useEffect(() => {
    const storedTerm = sessionStorage.getItem('searchTerm');
    if (storedTerm) {
      setSearchTerm(storedTerm);
    }
  }, [setSearchTerm]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem('authData'));
        const token = authData?.token;
        const response = await axios.get(`${API_URL}/users/mentor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMentor(response.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, [id]);

  const handleDateSelect = (date) => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`${API_URL}/classes/mentorclass/${id}`, {
          params: {
            subjectName: searchTerm,
          }
        });
        const classDetails = response.data.clases || [];
        const filtered = classDetails.filter(detail => new Date(detail.Date).toDateString() === date.toDateString());
        setFilteredSchedule(filtered);
      } catch (error) {
        console.error("Error fetching class schedule:", error);
      }
    };

    fetchSchedule();
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-warning" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" className="text-warning" />);
    }

    return stars;
  };

  if (!mentor) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div>
      <h1>Perfil del Mentor</h1>
      <img
        src={mentor.profileImageUrl || "https://via.placeholder.com/300x300"}
        alt={`${mentor.MentorName} profile`}
        className="mentor-image"
      />
      <h2>{mentor.MentorName}</h2>
      <p><strong>Materia:</strong> {mentor.SubjectName}</p>
      <p><strong>Universidad:</strong> {mentor.MentorUniversity}</p>
      <p><strong>Rating:</strong> {mentor.Opinion}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default PerfilMentor;

