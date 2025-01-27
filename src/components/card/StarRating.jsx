import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export const StarRating = ({ rating }) => {
  const stars = [];
  const maxStars = 5;

  // Estrellas llenas
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        key={`full-${i}`}
        style={{ color: "gold" }}
      />
    );
  }

  // Media estrella
  if (rating % 1 !== 0) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarHalfAlt}
        key="half"
        style={{ color: "gold" }}
      />
    );
  }

  // Estrellas vacías (transparentes)
  const emptyStars = maxStars - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarRegular}
        key={`empty-${i}`}
        style={{
          opacity: 0.3,
          color: "#b0b0b0",
        }}
      />
    );
  }

  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
};
