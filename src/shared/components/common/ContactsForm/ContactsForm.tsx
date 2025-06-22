'use client';

import React from 'react';

import { useLang } from '@/shared/hooks/useLang';
import { FormInput } from '../FormInput/FormInput';

import css from './ContactsForm.module.css';

interface ContactsFormProps {
  className?: string;
}

export const ContactsForm: React.FC<ContactsFormProps> = ({}) => {
  const { lang, translations } = useLang();
  return (
    <>
      <h4 className={css.checkout__contacts__text}>
        {translations[lang].checkout.contacts}
      </h4>
      <div className={css.checkout__inputs__wrapper}>
        <FormInput
          name="firstName"
          label={translations[lang].checkout.firstName}
          placeholder={translations[lang].checkout.firstName}
          required={true}
        />
        <FormInput
          name="lastName"
          label={translations[lang].checkout.lastName}
          placeholder={translations[lang].checkout.lastName}
          required={true}
        />
      </div>
      <div className={css.checkout__inputs__wrapper}>
        <FormInput
          name="email"
          label={translations[lang].checkout.email}
          placeholder={translations[lang].checkout.email}
          required={true}
        />
        <FormInput
          name="phone"
          label={translations[lang].checkout.phone}
          placeholder={translations[lang].checkout.phone}
          required={true}
        />
      </div>
      <span className={css.checkout__contacts__text}>
        {translations[lang].checkout.about_email}
      </span>
    </>
  );
};
