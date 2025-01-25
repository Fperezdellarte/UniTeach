import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./mentorCards.css";

const MentorInfo = ({ mentor }) => (
  <div>
    <h3 className="card-mentor-title">{mentor.MentorName}</h3>
    <p className="card-mentor-text">Materia: {mentor.SubjectName}</p>
    <p className="card-mentor-text">Universidad: {mentor.MentorUniversity}</p>
  </div>
);

export const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5; // Total de estrellas

    // Agregar estrellas llenas
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`full-${i}`}
          className="text-warning"
        />
      );
    }

    // Agregar media estrella si corresponde
    if (rating % 1 !== 0) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          key="half"
          className="text-warning"
        />
      );
    }

    const emptyStars = maxStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`empty-${i}`}
          className="empty-star"
        />
      );
    }

    return stars;
  };

  return (
    <div className="mentor-container">
      <div
        onClick={() => navigate(`/app/perfilMentor/${mentor.idUser}`)}
        className="mentor-card"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ transform: isHovered ? "scale(1.05)" : "none" }}
      >
        <img
          src={mentor.Avatar_URL || "https://via.placeholder.com/500x500"}
          alt={`${mentor.MentorName} profile`}
          className="mentor-image"
        />
        <div className="card-body">
          <MentorInfo className="mentor-info" mentor={mentor} />
          <div className=" mentor-card-stars mb-2">
            {renderStars(mentor.Opinion || 0)}
          </div>
        </div>
      </div>
    </div>
  );
};
