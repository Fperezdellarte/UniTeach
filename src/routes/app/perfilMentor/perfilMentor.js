import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PerfilMentor.css";
import { API_URL } from "../../../config/constans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ClassScheduleCalendar from "./calendar/ClassScheduleCalendar";
import { useBuscador } from "../../../hooks/useBuscador";
import CircularProgress from "@mui/material/CircularProgress";

const PerfilMentor = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const { searchTerm, setSearchTerm } = useBuscador();

  useEffect(() => {
    const storedTerm = sessionStorage.getItem("searchTerm");
    if (storedTerm) {
      setSearchTerm(storedTerm);
    }
  }, [setSearchTerm]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const authData = JSON.parse(sessionStorage.getItem("authData"));
        const token = authData?.token;
        const response = await axios.get(`${API_URL}/users/mentor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        const response = await axios.get(
          `${API_URL}/classes/mentorclass/${id}`,
          {
            params: {
              subjectName: searchTerm,
            },
          }
        );
        const classDetails = response.data.clases || [];
        const filtered = classDetails.filter(
          (detail) =>
            new Date(detail.Date).toDateString() === date.toDateString()
        );
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
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} className="text-warning" />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          key="half"
          className="text-warning"
        />
      );
    }

    return stars;
  };

  if (!mentor) {
    return (
      <div>
        <div className="loading-container">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="container-result-mentor">
      <div className="mentor-profile">
        <div className="profile-container">
          <div className="profile-info">
            <img
              src={mentor.Avatar_URL || "https://via.placeholder.com/300x300"}
              alt={`${mentor.Name} profile`}
              className="mentor-image"
            />
            <div className="profile-details">
              <h2>{mentor.Name}</h2>
              <p>{mentor.University}</p>
              <h3>Descripción</h3>
              <div className="description-box">
                {mentor.Description || "No disponible"}
              </div>
              <div className="rating">{renderStars(mentor.Opinion || 0)}</div>
              <div className="buttons-container">
                <button
                  className="custom-button"
                  onClick={() => setShowPhone(!showPhone)}
                >
                  {showPhone ? "Ocultar Teléfono" : "Contactar para una clase"}
                </button>
                <button
                  className="custom-button"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {showCalendar
                    ? "Ocultar Horario de Clases"
                    : "Ver calendario de clases"}
                </button>
              </div>
              {showPhone && (
                <p className="phone-number">Teléfono: {mentor.Phone}</p>
              )}
              {showCalendar && (
                <div className="container-calendar">
                  <ClassScheduleCalendar
                    mentorId={id}
                    searchTerm={searchTerm}
                    onDateSelect={handleDateSelect}
                  />
                  <div className="schedule-details">
                    {filteredSchedule.length > 0 ? (
                      <ul>
                        {filteredSchedule.map((item, index) => (
                          <li key={index}>
                            {item.hour} -{" "}
                            {new Date(item.Date).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilMentor;
