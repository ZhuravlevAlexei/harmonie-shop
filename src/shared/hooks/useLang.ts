'use client';

import { useUnit } from 'effector-react';
import { $lang } from '@/shared/store/lang';
import translationJson from '../../../public/translations.json';

export const useLang = () => {
  const lang = useUnit($lang);
  const translations = translationJson;

  return { lang, translations };
};
