import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, handleClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5">
        Are you sure you want to delete this?
      </Modal.Body>
      <Modal.Footer className="py-3">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
