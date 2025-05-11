import React from 'react';
import { HeaderAdmin } from '@/shared/components/Admin/HeaderAdmin/HeaderAdmin';

export const metadata = {
  title: 'ADMIN Harmonie Shop',
  description: 'ADMIN Layout',
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderAdmin />
      <main>{children}</main>
    </>
  );
}
