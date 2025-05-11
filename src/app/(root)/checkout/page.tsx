import { Metadata } from 'next';
import React from 'react';

import { Checkout } from '@/shared/components/common/Checkout/Checkout';

export const metadata: Metadata = {
  title: 'Checkout Harmonie Shop',
  description: 'Checkout Harmonie Shop',
};

export default async function CheckoutPage() {
  return (
    <div>
      <Checkout />
    </div>
  );
}
