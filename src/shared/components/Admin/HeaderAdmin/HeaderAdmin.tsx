import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../../common/Button/Button';

import css from './HeaderAdmin.module.css';

interface HeaderAdminProps {
  isLoggedIn?: boolean;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = () => {
  const isLoggedIn = false;
  return (
    <header className={css.header}>
      <Link href="/" className={css.header__logo__link}>
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className={css.header__logo__text}>Harmonie</div>
      </Link>
      <div className={css.header__auth}>
        <span className={css.header__auth__text}>
          {isLoggedIn ? 'Welcome, Username!' : 'Authorize please!'}
        </span>
        <Button className={css.header__button}>
          {isLoggedIn ? 'Log out' : 'Log in'}
        </Button>
      </div>
    </header>
  );
};
