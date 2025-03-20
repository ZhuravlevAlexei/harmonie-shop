import { create } from 'zustand';
import { AllowedLangs } from '../constants/common';

interface LangState {
  lang: AllowedLangs;
  setLang: (lang: AllowedLangs) => void;
}

export const useZLang = create<LangState>()(set => ({
  lang: AllowedLangs.UK,
  setLang: (lang: AllowedLangs) => set({ lang }),
}));
