import React from 'react';
import Link from 'next/link';

import { useLang } from '@/shared/hooks/useLang';

import css from './Navigation.module.css';

export const Navigation: React.FC = () => {
  const { lang, translations } = useLang();
  return (
    <nav className={css.nav}>
      <Link href="/contacts" className={css.nav__link}>
        {translations[lang].header.contacts}
      </Link>
    </nav>
  );
};
