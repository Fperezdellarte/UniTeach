import React from "react";
import { MentorCard } from "../../../../components/card/MentorCard";

export const MentorCardsList = ({ mentors, onCardClick }) => {
  return (
    <div className="container-mentor-results">
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.idUser}
          mentor={mentor}
          onClick={() => onCardClick(mentor.idUser)}
        />
      ))}
    </div>
  );
};
