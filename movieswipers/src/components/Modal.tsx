import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  copyToClipboard: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, sessionId, copyToClipboard }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Session Created</DialogTitle>
      <DialogContent>
        <p>Session ID: {sessionId}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => copyToClipboard(sessionId)}>Copy Session ID</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;