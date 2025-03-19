'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import css from './Header.module.css';
import { AllowedLangs } from '@/shared/constants/common';
import { SearchInput } from '../SearchInput/SearchInput';
import { Navigation } from '../Navigation/Navigation';
import { ProfileButton } from '../ProfileButton/ProfileButton';
import { CartButton } from '../CartButton/CartButton';
import { useLang } from '@/shared/hooks/useLang';
import { setLang } from '@/shared/store/lang';

export const Header: React.FC = () => {
  const { lang } = useLang();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLang(event.target.value as AllowedLangs);
    localStorage.setItem(
      'harmonie-lang',
      JSON.stringify(event.target.value as AllowedLangs)
    );
  };

  return (
    <header className={css.header}>
      <Link href="/" className={css.header__logo__link}>
        <Image src="/logo.png" width={32} height={32} alt="Logo" />
        <div className={css.header__logo__text}>Harmonie</div>
      </Link>

      <SearchInput />

      <div className={css.header__lang}>
        <select
          className={css.header__lang__select}
          value={lang}
          onChange={handleLanguageChange}
        >
          <option value={AllowedLangs.UK}>UK</option>
          <option value={AllowedLangs.RU}>RU</option>
        </select>
      </div>

      <div className={css.header__buttons}>
        <Navigation />
        <ProfileButton />
        <CartButton />
      </div>
    </header>
  );
};
