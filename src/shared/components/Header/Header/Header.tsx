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
import { useProductsStore } from '@/shared/store/products';

export const Header: React.FC = () => {
  const handleRootClick = () => {
    useProductsStore.setState({
      activeGroup: null,
      activeProduct: null,
      searchText: '',
    });
  };

  return (
    <header className={css.header}>
      <Link
        href="/"
        className={css.header__logo__link}
        onClick={handleRootClick}
      >
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
