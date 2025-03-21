'use client';

import React from 'react';
import { House } from 'lucide-react';
import { useLang } from '@/shared/hooks/useLang';
import css from './RootPoint.module.css';

export const RootPoint: React.FC = () => {
  const { lang, translations } = useLang();
  return (
    <div className={css.root_point}>
      <House />
      {translations[lang].root_point}
    </div>
  );
};
