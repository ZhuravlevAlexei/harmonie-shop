import { Metadata } from 'next';
import React from 'react';
import { Cart } from '@/shared/components/common/Cart/Cart';

export const metadata: Metadata = {
  title: 'Корзина Harmonie Shop',
  description: 'Корзина Harmonie Shop',
};

export default async function CartPage() {
  return (
    <div>
      <Cart />
    </div>
  );
}
