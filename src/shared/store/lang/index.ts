'use client';
import { createDomain } from 'effector';
import { AllowedLangs } from '@/shared/constants/common';

export const lang = createDomain();

export const setLang = lang.createEvent<AllowedLangs>();
