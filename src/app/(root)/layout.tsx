import { Header } from '@/shared/components/Header';
import React from 'react';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <footer></footer> */}
    </>
  );
}
