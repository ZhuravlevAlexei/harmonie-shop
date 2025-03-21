'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartButton, Navigation, ProfileButton, SearchInput } from '..';
import { AllowedLangs } from '@/shared/constants/common';
import { useLang } from '@/shared/hooks/useLang';
import css from './Header.module.css';

export const Header: React.FC = () => {
  const { lang, setlang } = useLang();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setlang(event.target.value as AllowedLangs);
    document.cookie = `harmonie_lang=${event.target.value}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    window.location.reload(); // Перезагружаем страницу, если нужен перевод контента
    // localStorage.setItem(
    //   'harmonie_lang',
    //   JSON.stringify(event.target.value as AllowedLangs)
    // );
  };

  React.useEffect(() => {
    // const lang = JSON.parse(localStorage.getItem('harmonie_lang') as string);
    const lang =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)harmonie_lang\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      ) || 'uk'; // Если кука не установлена, возвращаем 'uk' по умолчанию
    if (lang) {
      if (lang === 'uK' || lang === 'ru') {
        setlang(lang as AllowedLangs);
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
