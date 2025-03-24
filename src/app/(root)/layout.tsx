import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Harmonie',
  description: 'Harmonie Shop',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      {modal}
    </main>
  );
}
