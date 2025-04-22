'use client';
import React from 'react';
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

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
    setError(name, { message: '' });
  };

  return (
    <div className={css.input__wrapper}>
      <label className={css.input__label} htmlFor={name}>
        {label}
      </label>
      <div className={css.input__anchor}>
        <input
          className={css.input_element}
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
