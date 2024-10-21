import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle?: string;
  movieImage?: string;
}

const MatchDialog: React.FC<MatchDialogProps> = ({ isOpen, onClose, movieTitle, movieImage }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Match Found!</DialogTitle>
      <DialogContent className="match-dialog">
        {movieImage && <img src={movieImage} alt={movieTitle} style={{ width: '100%', height: 'auto' }} />}
        <h2>{movieTitle}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MatchDialog;
