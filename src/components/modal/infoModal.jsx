import { Modal, Button } from "react-bootstrap";

export const InfoModal = ({ show, title, message, onClose }) => (
  <Modal
    show={show}
    onHide={onClose}
    centered
    className="modal-clases"
    animation={true}
  >
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onClose}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>
);
