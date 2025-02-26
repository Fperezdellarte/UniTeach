import React, { useContext, useState } from "react";
import { ClassesContext } from "../../../contexts/classesContext";
import { TableClases } from "./tableClasesDetail/TableClases";
import { RatingModal } from "./ratingModal/RatingModal";
import { useTheme } from "../../../contexts/themeContext";
import "./clases.css";

export const Clases = () => {
  const { classesData, error, loading, fetchClassesData } =
    useContext(ClassesContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { theme } = useTheme();
  const handleRateClick = (mentorId) => {
    setSelectedId(mentorId);
    setShowModal(true);
  };
  return (
    <div style={{ margin: "20px", height: "100vh" }}>
      <div
        style={{
          width: "content-fit",
          padding: "15px",
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          borderRadius: "10px",
          flexGrow: 1,
          transition: theme.transitions.create(
            ["background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),
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
