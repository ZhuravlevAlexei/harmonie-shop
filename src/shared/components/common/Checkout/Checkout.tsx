'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLang } from '@/shared/hooks/useLang';
import { Cart } from '../Cart/Cart';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-form-schema';

import css from './Checkout.module.css';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { AddressForm } from '../AddressForm/AddressForm';

export const Checkout: React.FC = () => {
  const { lang, translations } = useLang();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      deliveryType: null,
      location: null,
      division: null,
      address: '',
      comment: '',
    },
  });
  const { handleSubmit, register } = form;

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('data: ', data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={css.checkout__wrapper}>
      <div className={css.checkout__data__wrapper}>
        <h3>{translations[lang].checkout.title}</h3>
        <FormProvider {...form}>
          <form
            className={css.checkout__form}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
            noValidate
          >
            <ContactsForm />
            <AddressForm />
            <textarea
              className={css.checkout__comment}
              id="comment"
              placeholder={translations[lang].checkout.comment}
              {...register('comment')}
            ></textarea>
            <button type="submit">Submit form button</button>
          </form>
        </FormProvider>
      </div>
      <div>
        <Cart forCheckout={true} />
      </div>
    </div>
  );
};
