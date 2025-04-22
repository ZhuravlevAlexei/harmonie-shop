'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { useLang } from '@/shared/hooks/useLang';
import { Cart } from '../Cart/Cart';
import { FormInput } from '../FormInput/FormInput';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-form-schema';

import { deliveryTypeOptions } from '@/shared/options/selectOptions';

import css from './Checkout.module.css';

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
      comment: '',
    },
  });
  const { handleSubmit, register, watch } = form;

  // const {
  //   // divisions,
  //   // valueForSelect,
  //   // setValueForSelect,
  //   // getSettlementsList,
  //   // getDivisionsList,
  // } = useNovaPoshta(deliveryType, cityId);

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
            {/* <ContactForm/> */}
            <h4>{translations[lang].checkout.contacts}</h4>
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

            {/* <AddressForm /> */}
            <h4>{translations[lang].checkout.delivery_new_post}</h4>
            <div className={css.checkout__delivery__select__wrapper}>
              <select
                id="mySelect"
                className={css.checkout__delivery__select}
                {...register('deliveryType')}
              >
                <option value="" disabled selected>
                  Оберіть варіант доставки...
                </option>
                {deliveryTypeOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {watch('deliveryType') && (
                <button
                  className={css.checkout__delivery__select__clear}
                  onClick={() => {
                    form.setValue('deliveryType', null);
                  }}
                  type="button"
                >
                  <X size={12} />
                </button>
              )}
            </div>
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
