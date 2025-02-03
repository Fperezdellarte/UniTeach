import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../../../config/constans";
import { useAuth } from "../../../../contexts/authContext";

export const RatingModal = ({ show, onClose, mentorId }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleRatingClick = async (star) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/users/rating/${mentorId}`,
        { rate: star },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(
        `Calificación enviada: ${star} estrellas para mentor ${mentorId}`
      );
      onClose();
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="fullscreen-modal"
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-clases-content-custom">
        <button className="close-modal-clases-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="rate-title">Califica al mentor</h2>
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className={`star-icon ${
                selectedRating >= star ? "selected" : ""
              }`}
              onClick={() => setSelectedRating(star)}
            />
          ))}
        </div>
        <button
          className="submit-rating-btn action-buttom"
          onClick={() => handleRatingClick(selectedRating)}
          disabled={selectedRating === 0 || isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            "Enviar Calificación"
          )}
        </button>
      </div>
    </Modal>
  );
};
