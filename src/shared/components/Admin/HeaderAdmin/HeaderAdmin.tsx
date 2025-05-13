'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthStore } from '@/shared/store/auth';

import { Button } from '../../common/Button/Button';
import LogInDialog from '../LogInDialog/LogInDialog';

import css from './HeaderAdmin.module.css';

export const HeaderAdmin: React.FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const user = useAuthStore(state => state.user);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOff = async () => {
    const res = await fetch('/api/auth/logoff', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      useAuthStore.setState({ isLoggedIn: false, user: null });
    }
    window.location.reload();
  };

  return (
    <header className={css.header}>
      <Link href="/" className={css.header__logo__link}>
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className={css.header__logo__text}>Harmonie</div>
      </Link>
      <div className={css.header__auth}>
        <span className={css.header__auth__text}>
          {user ? `Welcome, ${user.name}` : 'Authorize please!'}
        </span>
        {isLoggedIn ? (
          <Button className={css.header__button} onClick={handleLogOff}>
            Log off
          </Button>
        ) : (
          <Button className={css.header__button} onClick={handleOpen}>
            Log in
          </Button>
        )}
      </div>
      {open && <LogInDialog isOpen={open} onClose={handleClose} />}
    </header>
  );
};
