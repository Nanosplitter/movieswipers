import React from 'react';
import './Modal.css'; // Create a CSS file for styling the modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  copyToClipboard: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, sessionId, copyToClipboard }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Session Created</h2>
        <p>Session ID: {sessionId}</p>
        <button onClick={() => copyToClipboard(sessionId)}>Copy Session ID</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;