'use client';

import { useLangStore } from '../store/lang';
import translationJson from '../../../public/translations.json';

export const useLang = () => {
  const lang = useLangStore(state => state.lang);
  const setlang = useLangStore(state => state.setLang);
  const translations = translationJson;

  return { lang, translations, setlang };
};
