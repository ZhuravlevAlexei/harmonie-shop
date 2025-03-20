'use client';

import { AllowedLangs } from '@/shared/constants/common';
import { lang, setLang } from '.';

export const $lang = lang
  .createStore<AllowedLangs>(AllowedLangs.UK)
  .on(setLang, (_, lang) => lang);
