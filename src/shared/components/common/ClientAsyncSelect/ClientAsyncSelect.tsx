'use client';

import AsyncSelect from 'react-select/async';
import { SingleValue } from 'react-select';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import { useLang } from '@/shared/hooks/useLang';

import { CheckoutFormValues } from '@/shared/validation/checkout-form-schema';
import { DivisionOptionType, LocationOptionType } from '@/shared/types/types';

import css from './ClientAsyncSelect.module.css';

interface ClientAsyncSelectProps {
  field: ControllerRenderProps<CheckoutFormValues, 'location' | 'division'>;
  defaultOptions: LocationOptionType[] | DivisionOptionType[];
  placeholder?: string;
  getSettlementsList: (inputValue: string) => Promise<LocationOptionType[]>;
  getDivisionsList?: (inputValue: string) => Promise<DivisionOptionType[]>;
}

const ClientAsyncSelect: React.FC<ClientAsyncSelectProps> = ({
  field,
  defaultOptions,
  placeholder,
  getSettlementsList,
  getDivisionsList,
}) => {
  const { lang, translations } = useLang();
  const {
    formState: { errors },
    setValue,
  } = useFormContext<CheckoutFormValues>();

  const errorText = errors[field.name]?.message as string;

  const handleChange = (
    option: SingleValue<LocationOptionType | DivisionOptionType>,
    name: string
  ) => {
    field.onChange(option);
    if (name === 'location')
      setValue('division', {
        label: translations[lang].checkout.choose_delivery_division,
        value: '',
      });
    setValue('deliveryLocation', '');
  };
  return (
    <>
      <AsyncSelect<LocationOptionType | DivisionOptionType>
        {...field}
        placeholder={placeholder}
        defaultOptions={defaultOptions}
        loadOptions={
          field.name === 'location' ? getSettlementsList : getDivisionsList
        }
        loadingMessage={() => 'Зачекайте, будь ласка, триває завантаження...'}
        isClearable
        value={field.value}
        onChange={option => handleChange(option, field.name)}
      />
      {errorText && <span className={css.errorText}>{errorText}</span>}
    </>
  );
};

export default ClientAsyncSelect;
