import { Modal } from "react-bootstrap";
import "./FacultyModal.css";
import { useBuscador } from "../../../contexts/searchContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { Alert, AlertTitle } from "@mui/material";

export const FacultyModal = ({ show, onHide }) => {
  const { user } = useAuth();
  const { handleSearch } = useBuscador();
  const Navigate = useNavigate();
  const handleModalClick = (facultad) => {
    try {
      handleSearch("", facultad, user?.University);
      onHide();
      Navigate("/app/results");
    } catch (error) {
      onHide();
      <Alert color="danger" variant="outlined">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>;
    }
  };
  const faculties = [
    {
      name: "Ingeniería",
      image:
        "https://images.griddo.universitatcarlemany.com/c/cover/q/95/w/828/h/468/p/center/f/avif/el-dibujo-tecnico-y-su-papel-en-la-ingenieria",
      label: "Facultad de Ingeniería",
    },
    {
      name: "Ciencias de la salud",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKewYg7Q29s9pqDuj_2_qRmN45zq2uXMHgww&s",
      label: "Facultad de Medicina",
    },
    {
      name: "Humanidades",
      image:
        "https://un.edu.mx/wp-content/uploads/2023/02/Universidad-del-Norte-Perspectivas-laborales-subtitulo-2.png",
      label: "Facultad de Psicología",
    },
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="fullscreen-modal"
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-content-custom">
        <button className="close-modal-btn" onClick={onHide}>
          ×
        </button>
        <div className="modal-options">
          {faculties.map((faculty, index) => (
            <div
              key={faculty.name}
              className={`modal-card fade-in delay-${index + 1}`}
              onClick={() => handleModalClick(faculty.name)}
            >
              <div
                className="modal-background"
                style={{ backgroundImage: `url(${faculty.image})` }}
              ></div>
              <div className="option-text">{faculty.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
