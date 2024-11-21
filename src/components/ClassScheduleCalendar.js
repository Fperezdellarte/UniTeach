import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { API_URL } from '../auth/constans';
import { useAuth } from '../auth/authProvider';
import '../styles/ClassScheduleCalendar.css';

const ClassScheduleCalendar = ({ mentorId, searchTerm }) => {
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedClassId, setSelectedClassId] = useState(null);
  const { user, token } = useAuth();
  const today = new Date();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`${API_URL}/classes/mentorclass/${mentorId}`, {
          params: {
            subjectName: searchTerm,
          }
        });
        setSchedule(response.data.clases);
      } catch (error) {
        console.error("Error fetching class schedule:", error);
      }
    };

    if (searchTerm) {
      fetchSchedule();
    }
  }, [mentorId, searchTerm]);

  const getTileClassName = ({ date }) => {
    const classDates = schedule.map(item => new Date(item.Date).toDateString());
    return classDates.includes(date.toDateString()) ? 'highlighted' : 'disabled';
  };

  const getTileDisabled = ({ date }) => {
    const classDates = schedule.map(item => new Date(item.Date).toDateString());
    return !classDates.includes(date.toDateString());
  };

  const handleDateChange = (date, event) => {
    if (!getTileDisabled({ date })) {
      setSelectedDate(date);
      const details = schedule.filter(item => new Date(item.Date).toDateString() === date.toDateString());
      setScheduleDetails(details);

      const { clientX, clientY } = event;
      setPopupPosition({ top: clientY + 10, left: clientX - 50 });
      
      setShowSchedule(true);
    }
  };

  const handleCloseSchedule = () => {
    setShowSchedule(false);
    setScheduleDetails([]);
  };

  const handleSelectClass = (classId) => {
    setSelectedClassId(classId);
  };

  const handleEnroll = async () => {
    if (!selectedClassId) {
      alert("Por favor, seleccione un horario.");
      return;
    }
  
    setLoading(true);
  
    try {
      await axios.post(`${API_URL}/inscription`, {
        Users_idUser: user.idUser,
        Classes_idClasses: selectedClassId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      handleCloseSchedule();
    } catch (error) {
      setLoading(false);
      console.error("Error inscribiéndose en la clase:", error);
      alert("Error al inscribirse. Por favor, intente de nuevo.");
    }
  };
  
  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={getTileClassName}
        tileDisabled={getTileDisabled}
        minDate={today}
      />
      {showSchedule && scheduleDetails.length > 0 && (
        <div className="schedule-popup" style={{ top: popupPosition.top, left: popupPosition.left }}>
          <button onClick={handleCloseSchedule} className="close-btn">✕</button>
          <ul>
            {scheduleDetails.map((item) => (
              <li 
                key={item.idClasses}
                className={`schedule-item ${selectedClassId === item.idClasses ? 'selected' : ''}`}
                onClick={() => handleSelectClass(item.idClasses)}
              >
                <input
                  type="radio"
                  checked={selectedClassId === item.idClasses}
                  readOnly
                />
                {item.hour} - {item.Place}
              </li>
            ))}
          </ul>
          <button onClick={handleEnroll} className="enroll-btn" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Inscribirme'}
          </button>
        </div>
      )}
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">
          Inscripción realizada con éxito.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ClassScheduleCalendar;


