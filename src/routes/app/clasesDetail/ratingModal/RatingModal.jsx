import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../../contexts/authContext";
import { mentorService } from "../../../../service/mentorService";

export const RatingModal = ({ show, onClose, mentorId, fetchClassesData }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleRatingClick = async () => {
    if (!selectedRating) return;
    try {
      setIsLoading(true);
      await mentorService.rateMentor(mentorId, selectedRating, comment, token);
      await fetchClassesData();
      onClose();
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
    } finally {
      setIsLoading(false);
      setSelectedRating(0);
      setComment("");
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
        <div>
          <input
            type="text"
            placeholder="Comentarios"
            className="coment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="submit-rating-btn action-buttom"
          onClick={handleRatingClick}
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
