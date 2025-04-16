'use client';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';

import css from './CartButton.module.css';
import Link from 'next/link';

export const CartButton: React.FC = () => {
  const totalQty = useCartStore(state => state.totalQty);
  return (
    <Link href={'/cart'} className={css.cart_button__link}>
      <div className={css.cart_button}>
        <ShoppingCart size={32} />
        {totalQty > 0 && (
          <span className={css.cart_button__circle}>
            <span className={css.cart_button__circle__text}>
              {totalQty > 9 ? '9+' : totalQty}
            </span>
          </span>
        )}
      </div>
    </Link>
  );
};
