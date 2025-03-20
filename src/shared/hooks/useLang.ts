'use client';

// import { useUnit } from 'effector-react';
// import { $lang } from '@/shared/store/lang/lang';
import { useZLang } from '../store/zlang';
import translationJson from '../../../public/translations.json';

export const useLang = () => {
  // const lang = useUnit($lang);
  const lang = useZLang(state => state.lang);
  const translations = translationJson;

  return { lang, translations };
};
