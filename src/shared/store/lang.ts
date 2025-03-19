'use client';

import { createDomain } from 'effector';
import { AllowedLangs } from '@/shared/constants/common';

const lang = createDomain();

export const setLang = lang.createEvent<AllowedLangs>();

export const $lang = lang
  .createStore<AllowedLangs>(AllowedLangs.UK)
  .on(setLang, (_, lang) => lang);
