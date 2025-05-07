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

import css from './AlertDialog.module.css';

export default function AlertDialog({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = React.useState(true);
  const { lang, translations } = useLang();

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
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
