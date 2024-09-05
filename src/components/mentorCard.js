import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mentorCards.css'; // Importa el archivo CSS personalizado

const MentorCard = ({ mentor, onClick }) => {
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

  return (
    <div className="mentor-card">
      <Link to={`/perfilMentor/${mentor.idUser}`} className="mentor-card-link">
        <img
          src={mentor.profileImageUrl || "https://via.placeholder.com/300x300"}
          alt={`${mentor.MentorName} profile`}
          className="mentor-image"
        />
        <div className="card-body">
          <h3 className="card-title">{mentor.MentorName}</h3>
          <div className="mb-2">{renderStars(mentor.Opinion)}</div>
          <p className="card-text">Materia: {mentor.SubjectName}</p>
          <p className="card-text">Universidad: {mentor.MentorUniversity}</p>
        </div>
      </Link>
    </div>
  );
};

export default MentorCard;

