import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/mentorCards.css';

const MentorInfo = ({ mentor }) => (
  <div>
    <h3 className="card-title">{mentor.MentorName}</h3>
    <p className="card-text">Materia: {mentor.SubjectName}</p>
    <p className="card-text">Universidad: {mentor.MentorUniversity}</p>
  </div>
);

const MentorCard = ({ mentor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-warning" />);
    }
    if (rating % 1 !== 0) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" className="text-warning" />);
    }
    return stars;
  };

  return (
    <div
      className="mentor-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ transform: isHovered ? 'scale(1.05)' : 'none' }}
    >
      <Link to={`/perfilMentor/${mentor.idUser}`} className="mentor-card-link">
        <img
          src={mentor.profileImageUrl || "https://via.placeholder.com/300x300"}
          alt={`${mentor.MentorName} profile`}
          className="mentor-image"
        />
        <div className="card-body">
          <MentorInfo mentor={mentor} />
          <div className="mb-2">{renderStars(mentor.Opinion)}</div>
          <div className="d-flex justify-content-between">
            <button className="btn custom-btn">Contactar</button>
            <button className="btn custom-btn">Ver historial</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MentorCard;