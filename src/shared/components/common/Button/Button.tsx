'use client';
import { Loader } from 'lucide-react';
import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  loading,
  children,
  ...props
}) => {
  return (
    <button disabled={disabled || loading} className={className} {...props}>
      {!loading ? children : <Loader className="animate-spin" />}
    </button>
  );
};
