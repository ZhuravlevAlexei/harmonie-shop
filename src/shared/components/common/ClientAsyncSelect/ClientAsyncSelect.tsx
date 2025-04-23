'use client';
import AsyncSelect from 'react-select/async';

import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { DivisionOptionType, LocationOptionType } from '@/shared/types/types';
import { SingleValue } from 'react-select';

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
  const { setValue } = useFormContext();

  const handleChange = (
    option: SingleValue<LocationOptionType | DivisionOptionType>,
    name: string
  ) => {
    field.onChange(option);
    if (name === 'location') setValue('division', null);
    setValue('address', '');
  };
  return (
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
  );
};

export default ClientAsyncSelect;
