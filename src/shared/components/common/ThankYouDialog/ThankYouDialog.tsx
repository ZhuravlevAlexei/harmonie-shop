'use client';

import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLang } from '@/shared/hooks/useLang';
import { Button } from '../Button/Button';

import css from './ThankYouDialog.module.css';

interface ThankYouDialogProps {
  isClientEmail: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouDialog({
  isClientEmail,
  isOpen,
  onClose,
}: ThankYouDialogProps) {
  const { lang, translations } = useLang();

  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {translations[lang].alert_dialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {translations[lang].alert_dialog.message}
            {'  '}
            {isClientEmail && translations[lang].alert_dialog.about_email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={css.alert__button} onClick={handleClose}>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
