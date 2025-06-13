'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { AllowedLangs } from '@/shared/constants/common';
import { useLang } from '@/shared/hooks/useLang';

import css from './LaguageSelect.module.css';

export const LaguageSelect: React.FC = () => {
  const router = useRouter();
  const { lang, setlang } = useLang();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setlang(event.target.value as AllowedLangs);
    document.cookie = `harmonie_lang=${event.target.value}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    // window.location.reload(); // Перезагружаем страницу, если нужен перевод контента !!!
    router.refresh();
  };

  React.useEffect(() => {
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
  );
};
