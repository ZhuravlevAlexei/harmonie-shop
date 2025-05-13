'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormInput } from '../../common/FormInput/FormInput';
import { Button } from '../../common/Button/Button';

import {
  LoginFormShema,
  LoginFormType,
} from '@/shared/validation/login-form-schema';

import css from './LogInDialog.module.css';

interface LogInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogInDialog({ isOpen, onClose }: LogInDialogProps) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginFormShema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit } = form;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: LoginFormType) => {
    const { email, password } = data;
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      router.push('/orders');
    } else {
      alert('Login failed');
    }

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
        <DialogTitle id="alert-dialog-title">Enter credentials</DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <div className={css.login__inputs__wrapper}>
                <FormInput name="email" label="Email" required={true} />
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  required={true}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button type="submit" className={css.login__button}>
                Log in
              </Button>
              <Button className={css.cancel__button} onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}
