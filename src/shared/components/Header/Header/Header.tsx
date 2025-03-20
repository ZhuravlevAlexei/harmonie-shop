'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from '../SearchInput/SearchInput';
import { Navigation } from '../Navigation/Navigation';
import { ProfileButton } from '../ProfileButton/ProfileButton';
import { CartButton } from '../CartButton/CartButton';
import { AllowedLangs } from '@/shared/constants/common';
import { useLang } from '@/shared/hooks/useLang';
import css from './Header.module.css';

export const Header: React.FC = () => {
  const { lang, setlang } = useLang();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setlang(event.target.value as AllowedLangs);
    localStorage.setItem(
      'harmonie-lang',
      JSON.stringify(event.target.value as AllowedLangs)
    );
  };

  React.useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('harmonie-lang') as string);
    if (lang) {
      if (lang === 'uK' || lang === 'ru') {
        setlang(lang);
      }
    }
  }, [setlang]);

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
