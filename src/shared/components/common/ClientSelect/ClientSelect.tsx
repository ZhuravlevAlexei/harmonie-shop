'use client';

import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';

import { useLang } from '@/shared/hooks/useLang';

import { CheckoutFormType } from '@/shared/validation/checkout-form-schema';
import { DeliveryOptionType } from '@/shared/types/types';

import css from './ClientSelect.module.css';

interface ClientSelectProps {
  field: ControllerRenderProps<CheckoutFormType, 'deliveryType'>;
  options: DeliveryOptionType[];
  placeholder?: string;
}

const ClientSelect: React.FC<ClientSelectProps> = ({
  field,
  options,
  placeholder,
}) => {
  const { lang, translations } = useLang();
  const {
    formState: { errors },
    setValue,
  } = useFormContext<CheckoutFormType>();

  const errorText = errors['deliveryType']?.message as string;

  const handleChange = (option: SingleValue<DeliveryOptionType>) => {
    field.onChange(option);
    setValue('location', {
      label: translations[lang].checkout.choose_delivery_location,
      value: { city: '', cityId: '' },
    });
    setValue('division', {
      label: translations[lang].checkout.choose_delivery_division,
      value: '',
    });
    setValue('deliveryLocation', '');
  };

  return (
    <>
      <Select<DeliveryOptionType>
        {...field}
        placeholder={placeholder}
        options={options}
        isClearable
        value={field.value}
        onChange={option => handleChange(option)}
      />
      {errorText && <span className={css.errorText}>{errorText}</span>}
    </>
  );
};

export default ClientSelect;
