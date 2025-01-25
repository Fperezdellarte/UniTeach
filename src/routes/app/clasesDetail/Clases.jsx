import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../contexts/classesContext";
import { TableClases } from "./tableClasesDetail/TableClases";
import { RatingModal } from "./ratingModal/RatingModal";
import "./Clases.css";

export const Clases = () => {
  const { classesData, error, loading } = useContext(ClassesContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRateClick = (mentorId) => {
    setSelectedId(mentorId);
    setShowModal(true);
  };
  console.log(classesData);
  return (
    <div>
      <TableClases
        data={classesData.recent}
        error={error}
        loading={loading}
        onRateClick={handleRateClick}
      />
      <RatingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        mentorId={selectedId}
      />
    </div>
  );
};
