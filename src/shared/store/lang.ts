'use client';

import { createDomain } from 'effector';
import { AllowedLangs } from '@/shared/constants/common';

const lang = createDomain();

export const setLang = lang.createEvent<AllowedLangs>();
let initialState = AllowedLangs.UK;

// check if the code is running in the browser
// and get the stored state and set the initial state
if (typeof window !== 'undefined') {
  const storedState = JSON.parse(
    localStorage.getItem('harmonie-lang') as string
  );
  if (storedState) {
    if (storedState === 'uK') {
      initialState = AllowedLangs.UK;
    } else if (storedState === 'ru') {
      initialState = AllowedLangs.RU;
    } else {
      initialState = AllowedLangs.UK;
    }
  }
}

export const $lang = lang
  .createStore<AllowedLangs>(initialState)
  .on(setLang, (_, lang) => lang);
