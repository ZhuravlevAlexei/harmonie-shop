import { Metadata } from 'next';
import React from 'react';
import { Cart } from '@/shared/components/common/Cart/Cart';

export const metadata: Metadata = {
  title: 'Cart Harmonie Shop',
  description: 'Cart Harmonie Shop',
};

export default async function CartPage() {
  return (
    <div>
      <Cart />
    </div>
  );
}
