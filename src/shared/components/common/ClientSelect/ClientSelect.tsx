'use client';

import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { DeliveryOptionType } from '@/shared/types/types';
import Select, { SingleValue } from 'react-select';

interface ClientSelectProps {
  field: ControllerRenderProps<CheckoutFormValues, 'deliveryType'>;
  options: DeliveryOptionType[];
  placeholder?: string;
}

const ClientSelect: React.FC<ClientSelectProps> = ({
  field,
  options,
  placeholder,
}) => {
  const { setValue } = useFormContext<CheckoutFormValues>();

  const handleChange = (option: SingleValue<DeliveryOptionType>) => {
    field.onChange(option);
    setValue('location', null);
    setValue('division', null);
    setValue('address', '');
  };

  return (
    <Select<DeliveryOptionType>
      {...field}
      placeholder={placeholder}
      options={options}
      isClearable
      value={field.value}
      onChange={option => handleChange(option)}
    />
  );
};

export default ClientSelect;
