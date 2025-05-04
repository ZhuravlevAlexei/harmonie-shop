'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

import { useLang } from '@/shared/hooks/useLang';
import { useNovaPoshta } from '@/shared/hooks/useNovaPosha';
import {
  deliveryTypeOptions,
  defaultOptionsForLocationSelect,
} from '@/shared/options/selectOptions';
import { FormInput } from '../FormInput/FormInput';
import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';

const ClientOnlySelect = dynamic(() => import('../ClientSelect/ClientSelect'), {
  ssr: false,
});

const ClientOnlyAsyncSelect = dynamic(
  () => import('../ClientAsyncSelect/ClientAsyncSelect'),
  {
    ssr: false,
  }
);

interface AddressFormProps {
  className?: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({}) => {
  const { lang, translations } = useLang();
  const { watch, control } = useFormContext<CheckoutFormValues>();

  const deliveryType = watch('deliveryType');
  const deliveryString = deliveryType ? deliveryType.value : '';
  const cityLocation = watch('location');
  const cityId = cityLocation ? cityLocation.value.cityId : '';

  const {
    divisions,
    // valueForSelect,
    // setValueForSelect,
    getSettlementsList,
    getDivisionsList,
  } = useNovaPoshta(deliveryType, cityId);

  return (
    <>
      <h4>{translations[lang].checkout.delivery_new_post}</h4>
      <Controller
        control={control}
        name="deliveryType"
        render={({ field }) => (
          <ClientOnlySelect
            field={field}
            options={deliveryTypeOptions}
            placeholder={translations[lang].checkout.choose_delivery_variant}
          />
        )}
      />
      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <ClientOnlyAsyncSelect
            field={field}
            defaultOptions={defaultOptionsForLocationSelect}
            placeholder={translations[lang].checkout.choose_delivery_location}
            getSettlementsList={getSettlementsList}
          />
        )}
      />

      {String(deliveryString) === 'Доставка кур`єром' ? (
        <FormInput
          name="deliveryLocation"
          // label={translations[lang].checkout.input_delivery_location}
          placeholder={translations[lang].checkout.input_delivery_location}
        />
      ) : (
        <Controller
          control={control}
          name="division"
          render={({ field }) => (
            <ClientOnlyAsyncSelect
              field={field}
              defaultOptions={divisions}
              placeholder={translations[lang].checkout.choose_delivery_division}
              getSettlementsList={getSettlementsList}
              getDivisionsList={getDivisionsList}
            />
          )}
        />
      )}
    </>
  );
};
