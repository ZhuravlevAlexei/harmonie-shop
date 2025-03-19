import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  return (
    <div className={className}>
      <ShoppingCart size={32} />
    </div>
  );
};
