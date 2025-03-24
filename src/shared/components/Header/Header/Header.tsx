'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CartButton,
  LaguageSelect,
  Navigation,
  ProfileButton,
  SearchInput,
} from '..';
import css from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={css.header}>
      <Link href="/" className={css.header__logo__link}>
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className={css.header__logo__text}>Harmonie</div>
      </Link>
      <SearchInput />
      <LaguageSelect />
      <div className={css.header__buttons}>
        <Navigation />
        <ProfileButton />
        <CartButton />
      </div>
    </header>
  );
};
