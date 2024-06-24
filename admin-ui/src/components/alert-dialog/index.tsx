import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

interface Props {
  onSuccess(): void;

  open: boolean;

  onClose(): void;

  dialogText?: string | React.ReactNode;
}

export const AlertDialog: React.FC<Props> = ({ onSuccess, open, onClose, dialogText }) => {
  const handle = () => {
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтвердите действие</DialogTitle>
      {dialogText && (
        <div style={{ margin: '24px' }}>
          <DialogContentText>{dialogText}</DialogContentText>
        </div>
      )}
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          НЕТ
        </Button>
        <Button onClick={handle} autoFocus color="primary" variant="contained">
          ДА
        </Button>
      </DialogActions>
    </Dialog>
  );
};
