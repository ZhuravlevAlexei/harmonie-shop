'use client';
import React from 'react';
// import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import dynamic from 'next/dynamic';

import { useLang } from '@/shared/hooks/useLang';
import { Cart } from '../Cart/Cart';
// import { FormInput } from '../FormInput/FormInput';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-form-schema';

// import {
//   deliveryTypeOptions,
//   defaultOptionsForLocationSelect,
// } from '@/shared/options/selectOptions';

import css from './Checkout.module.css';
// import { useNovaPoshta } from '@/shared/hooks/useNovaPosha';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { AddressForm } from '../AddressForm/AddressForm';

// const ClientOnlySelect = dynamic(() => import('../ClientSelect/ClientSelect'), {
//   ssr: false,
// });

// const ClientOnlyAsyncSelect = dynamic(
//   () => import('../ClientAsyncSelect/ClientAsyncSelect'),
//   {
//     ssr: false,
//   }
// );

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

  // const deliveryType = form.watch('deliveryType');
  // const deliveryString = deliveryType ? deliveryType.value : '';
  // const cityLocation = form.watch('location');
  // const cityId = cityLocation ? cityLocation.value.cityId : '';

  // const {
  //   divisions,
  //   // valueForSelect,
  //   // setValueForSelect,
  //   getSettlementsList,
  //   getDivisionsList,
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
            <ContactsForm />

            <AddressForm />
            {/* <h4>{translations[lang].checkout.delivery_new_post}</h4>
            <Controller
              control={form.control}
              name="deliveryType"
              render={({ field }) => (
                <ClientOnlySelect
                  field={field}
                  options={deliveryTypeOptions}
                  placeholder={
                    translations[lang].checkout.choose_delivery_variant
                  }
                />
              )}
            /> */}
            {/* <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <ClientOnlyAsyncSelect
                  field={field}
                  defaultOptions={defaultOptionsForLocationSelect}
                  placeholder={
                    translations[lang].checkout.choose_delivery_location
                  }
                  getSettlementsList={getSettlementsList}
                />
              )}
            /> */}

            {/* {String(deliveryString) === 'Доставка кур`єром' ? (
              <FormInput
                name="address"
                // label={translations[lang].checkout.input_address}
                placeholder={translations[lang].checkout.input_address}
              />
            ) : (
              <Controller
                control={form.control}
                name="division"
                render={({ field }) => (
                  <ClientOnlyAsyncSelect
                    field={field}
                    defaultOptions={divisions}
                    placeholder={
                      translations[lang].checkout.choose_delivery_division
                    }
                    getSettlementsList={getSettlementsList}
                    getDivisionsList={getDivisionsList}
                  />
                )}
              />
            )} */}

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
