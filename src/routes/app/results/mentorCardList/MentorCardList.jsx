import React from "react";
import { MentorCard } from "../../../../components/card/mentorCard";

export const MentorCardsList = ({ mentors, onCardClick }) => {
  return (
    <div className="row container-mentor-results">
      {mentors.map((mentor) => (
        <div className="col-lg-3 col-md-6 mb-4" key={mentor.idUser}>
          <MentorCard
            mentor={mentor}
            onClick={() => onCardClick(mentor.idUser)}
          />
        </div>
      ))}
    </div>
  );
};
