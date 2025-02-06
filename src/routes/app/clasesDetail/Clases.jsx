import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../contexts/classesContext";
import { TableClases } from "./tableClasesDetail/TableClases";
import { RatingModal } from "./ratingModal/RatingModal";
import "./clases.css";

export const Clases = () => {
  const { classesData, error, loading, fetchClassesData } =
    useContext(ClassesContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRateClick = (mentorId) => {
    console.log("Rating clicked:", mentorId);
    setSelectedId(mentorId);
    setShowModal(true);
  };
  return (
    <div style={{ margin: "20px", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "white",
          width: "content-fit",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          flexGrow: 1,
        }}
      >
        <TableClases
          data={classesData.recent}
          error={error}
          loading={loading}
          onRateClick={handleRateClick}
        />
      </div>
      <RatingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        mentorId={selectedId}
        fetchClassesData={fetchClassesData}
      />
    </div>
  );
};
