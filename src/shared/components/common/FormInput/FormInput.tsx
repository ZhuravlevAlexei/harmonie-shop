'use client';
import React from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

import { useFormContext } from 'react-hook-form';

import css from './FormInput.module.css';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  //   className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useFormContext();

  const isAddress = name === 'address';

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
    setError(name, { message: '' });
  };

  return (
    <div className={css.input__wrapper}>
      <label
        className={clsx(css.input__label, isAddress && css.full_width)}
        htmlFor={name}
      >
        {label}
      </label>
      <div className={clsx(css.input__anchor, isAddress && css.full_width)}>
        <input
          className={clsx(css.input_element, isAddress && css.full_width)}
          type="text"
          id={name}
          autoComplete="off"
          required={required}
          {...props}
          {...register(name)}
        />
        {value && (
          <button
            tabIndex={-1}
            className={css.input__clear__button}
            type="button"
            onClick={onClickClear}
          >
            <X size={12} />
          </button>
        )}
      </div>
      {errorText && <span className={css.errorText}>{errorText}</span>}
    </div>
  );
};
