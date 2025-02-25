import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Rating from "@mui/material/Rating";
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
      style={{backdropFilter: "blur(5px)"}}
    >
      <div className="modal-clases-content-custom">
        <button className="close-modal-clases-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="rate-title">Califica al mentor</h2>

        <div className="stars-container">
          <Rating
            name="mentor-rating"
            value={selectedRating}
            onChange={(event, newValue) => setSelectedRating(newValue)}
            precision={0.5}
            style={{ fontSize: "3rem", }}
          />
        </div>

        <div>
        <textarea
          type="text"
          placeholder="Comentarios"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            outline: "none",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            color: "#333",
            maxWidth: "100%",
            flexWrap: "wrap",
          }}
          onFocus={(e) => {
            e.target.style.border = "2px solid #007bff";
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 15px rgba(0, 123, 255, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.border = "2px solid #ccc";
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
          }}/>
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
